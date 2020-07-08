<template>
  <v-container class="planet-resources-wrapper">
    <v-row class="mode-select-wrapper flex-column">
      <h1>行星制造产物规划</h1>
      <p>{{ version }}</p>
    </v-row>
    <v-row>
      <v-expansion-panels accordion multiple v-model="defaultPanelStatus">
        <!-- 产物状态 -->
        <v-expansion-panel>
          <v-expansion-panel-header>产物状态</v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- 已有 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title" title="设定已经拥有的产物">已有: {{ ownedProductNames.length }}个</div>
              <div>
                <v-chip-group column>
                  <v-chip v-for="name in ownedProductNames" :key="name" close @click:close="toggleOwned(name)">
                    {{ name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <!-- 可造 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title" title="根据已经拥有的产物可以制造的新产物">可造: {{ satisfiedProductNames.length }}个</div>
              <div>
                <v-chip-group column>
                  <v-chip v-for="name in satisfiedProductNames" :key="name">
                    {{ name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <!-- 目标 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title" title="打算制造的产物">目标: {{ targetProductNames.length }}个</div>
              <div>
                <v-chip-group column>
                  <v-chip v-for="name in targetProductNames" :key="name" close @click:close="toggleTarget(name)">
                    {{ name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <!-- 仍需要 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title" title="要达到目标仍然需要的前置产物">需要: {{ requiredProducts.length }}个</div>
              <div>
                <v-chip-group column>
                  <v-chip v-for="item in requiredProducts" :key="item.name">
                    <span :class="item.class">{{ item.name }}</span>
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- 产物图 -->
        <v-expansion-panel>
          <v-expansion-panel-header>详情</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="resource-content-wrapper flex-row width-100">
              <!-- 循环产物 -->
              <div class="products-level-wrapper" v-for="type in productTypesReversed" :key="type">
                <div style="text-transform: capitalize">{{ type }}</div>
                <div class="products-level-container">
                  <ProductItem
                    v-for="item in planetResources[type].items"
                    :key="item.name"
                    :item="item"
                    @highlight-product="highlightRelatedItems($event.name)"
                    @show-product-detail="showProductDetail($event)"
                    @toggle-owned="toggleOwned($event.name)"
                    @toggle-target="toggleTarget($event.name)"
                  />
                </div>
              </div>
              <!-- 留空为连线 -->
              <div class="products-level-interval"></div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- 说明 -->
        <v-expansion-panel>
          <v-expansion-panel-header>说明</v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instructions />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- modal -->
    <ProductDetailModal :product="detailedProduct" :show.sync="isDetailModalShown" />
  </v-container>
</template>

<script>
import { planetResources } from '../utils/planetReources';
import ProductItem from './ProductItem';
import ProductDetailModal from './ProductDetailModal';
import Instructions from './Instructions';
import * as d3 from 'd3';

export default {
  components: { ProductItem, ProductDetailModal, Instructions },
  data: () => ({
    version: "v0.2", // 程序版本
    defaultPanelStatus: [0, 1, 2], // 默认展开的panels
    productTypes: ['p0', 'p1', 'p2', 'p3', 'p4'], // 行星产物类型
    planetResources: planetResources,
    hiddenSections: {}, // 隐藏的类型, p1: true,
    productStatus: {}, // 所有产物状态, name: Object
    targetProducts: {}, // 目标产物, name: bool
    ownedProducts: {}, // 现有的产物, name: bool
    // requiredProducts: {}, // 需要的产物, name: bool
    satisfiedProducts: {}, // 满足需求的产物, name: bool
    highlightedProductName: '', // 点击的高亮产物名
    highlightedProducts: [], // 高亮的产物名列表
    detailedProduct: {}, // 显示详情obj
    isDetailModalShown: false, // 是否显示modal详情
  }),
  computed: {
    productTypesReversed() {
      return Object.assign([], this.productTypes).reverse();
    },
    ownedProductNames() {
      return Object.keys(this.ownedProducts).filter(p => this.ownedProducts[p]);
    },
    targetProductNames() {
      return Object.keys(this.targetProducts).filter(p => this.targetProducts[p]);
    },
    satisfiedProductNames() {
      return Object.keys(this.satisfiedProducts).filter(p => this.satisfiedProducts[p]);
    },
    requiredProducts() {
      let res = [];
      for (let name in this.productStatus) {
        const item = this.productStatus[name];
        const { required, targeted, satisfied, unsatisfied, partial } = item.statusObj || {};
        if (required && !targeted) {
          res.push({
            name,
            class: {
              satisfied,
              unsatisfied,
              partial,
            }
          })
        }
      }
      return res;
    }
  },
  mounted() {
    this.updateProductStatus();
  },
  methods: {
    highlightRelatedItems(name) {
      // console.log('highlightRelatedItems', name);
      if (this.highlightedProductName === name) {
        // 取消高亮
        this.highlightedProductName = '';
        this.highlightedProducts = [];
      } else {
        this.highlightedProductName = name;
        this.highlightedProducts = [name];
        // 寻找后置
        if (this.productStatus[name].from) {
          this.highlightedProducts = [...this.highlightedProducts, ...this.productStatus[name].from.map(i => i.name)];
        }
        // 寻找前置
        for (let pname in this.productStatus) {
          if (this.productStatus[pname].from && this.productStatus[pname].from.find(i => i.name === name)) {
            this.highlightedProducts.push(pname);
          }
        }
      }
      // console.log('this.highlightedProducts', this.highlightedProducts);
      this.updateProductStatus();
    },
    showProductDetail(item) {
      // console.log('showProductDetail', item.name);
      this.detailedProduct = item;
      this.isDetailModalShown = true;
    },
    toggleOwned(name) {
      // console.log('toggleOwned', name);
      this.$set(this.ownedProducts, name, !this.ownedProducts[name])
      // 删除此target
      this.$set(this.targetProducts, name, false);
      this.updateProductStatus();
    },
    toggleTarget(name) {
      // console.log('toggleTarget', name);
      this.$set(this.targetProducts, name, !this.targetProducts[name])
      // 删除此owned
      this.$set(this.ownedProducts, name, false);
      this.updateProductStatus();
    },
    updateProductStatus() {
      // 记录产物状态
      let res = {};
      // 记录满足条件的产物, name: true/false
      let satisfiedProducts = {}; 
      // 从p0开始遍历产品
      for (let type of this.productTypes) {
        const resourceType = planetResources[type];
        for (let item of resourceType.items) {
          // 默认设置statusObj
          this.$set(item, 'statusObj', {
            owned: false,
            targeted: false,
            required: false,
            satisfied: false,
            unsatisfied: false,
            partial: false,
            highlighted: this.highlightedProducts.includes(item.name),
          })
          if (this.ownedProducts[item.name]) {
            // 如果是已有产物，标记owned
            this.$set(item, 'statusObj', {
              ...item.statusObj, 
              owned: true,
            });
          } else if (this.targetProducts[item.name]) {
            // 是目标产物
             this.$set(item, 'statusObj', {
              ...item.statusObj,
              targeted: true,
            });
          }
          // 尝试搜索当前产物的from是否被满足。
          // 因为当前产物的依赖必然来自底层，所以已经被处理过
          if (item.from) {
            for (let fromItem of item.from) {
              const satisfied = this.ownedProducts[fromItem.name];
              // 处理from产物
              fromItem.satisfied = satisfied;
              // fromItem.unsatisfied = !satisfied;
            }
            // 统计满足条件的产物数
            const countSatisfied = item.from.filter(p => p.satisfied).length;
            this.$set(item, 'statusObj', {
              ...item.statusObj,
              satisfied: countSatisfied === item.from.length, // 全都满足
              unsatisfied: countSatisfied === 0, // 没有一个满足
              partial: countSatisfied > 0 && countSatisfied < item.from.length, // 部分满足
            });
            if (countSatisfied === item.from.length) {
              // 前置都满足，标记当前产物满足
              satisfiedProducts[item.name] = true;
            }
          } else {
            // 非owned p0没有from, 设置本身unsatisfied
            this.$set(item, 'statusObj', {
              ...item.statusObj,
              unsatisfied: true,
            });
          }
          // 把item加到结果中
          this.$set(res, item.name, item);
        }
      }
      // 更新满足条件的
      this.satisfiedProducts = satisfiedProducts;
      // 从target往下遍历需要的产物
      let requiredProductNames = Object.keys(this.targetProducts).filter(p => this.targetProducts[p]);
      while(requiredProductNames.length > 0) {
        const name = requiredProductNames.pop();
        const product = res[name];
        // 设置该产物为required
        product.statusObj = {
          ...product.statusObj,
          required: true,
        };
        // 遍历前置
        if (product.from) {
          for (let item of product.from) {
            item.satisfied = this.ownedProducts[item.name] || satisfiedProducts[item.name];
            // 如果item不在现有产物中，则加到列表里继续循环
            if (!this.ownedProducts[item.name]) {
              requiredProductNames.push(item.name);
            }
          }
        }
        // 更新res
        this.$set(res, name, product);
      }
      // 返回
      this.productStatus = res;
      // 准备划线
      this.$nextTick(() => {
        // let pos = document.getElementsByClassName('resource-content-wrapper')[0].getBoundingClientRect();
        // this.drawALineBetween(document.getElementById('生物燃料'), document.getElementById('微生物'), pos);
        // this.drawALineBetween(document.getElementById('无菌管道'), document.getElementById('水'), pos);
        this.drawLines();
      });
    },
    // 连线部分
    // 获取div的左中点坐标
    getDivLeftCenter(div) {
      const pos1 = div.getBoundingClientRect();
      // 左上点坐标
      let res = {
        x: pos1.left + Math.max(div.scrollLeft, document.body.scrollLeft) - div.clientLeft,
        y: pos1.top + Math.max(div.scrollTop, document.body.scrollTop) - div.clientTop,
      };
      // 加上1/2高度
      res.y += pos1.height / 2;
      return res;
    },
    // 获取div的右中点坐标
    getDivRightCenter(div) {
      const pos1 = div.getBoundingClientRect();
      // 左上点坐标
      let res = {
        x: pos1.left + Math.max(div.scrollLeft, document.body.scrollLeft) - div.clientLeft,
        y: pos1.top + Math.max(div.scrollTop, document.body.scrollTop) - div.clientTop,
      };
      // 加上div宽度
      res.x += pos1.width;
      // 加上1/2高度
      res.y += pos1.height / 2;
      return res;
    },
    // 连线
    drawLines() {
      // 删除所有连线
      document.querySelectorAll('.resource-content-wrapper > svg').forEach(d => d.remove());
      // 获取 resource-content-wrapper 作为相对位置
      let dom = document.getElementsByClassName('resource-content-wrapper');
      if (!dom) return; // 确保wrapper存在
      dom = dom[0];
      if (!dom.getBoundingClientRect) return; // 确保方法存在
      const relativePos = dom.getBoundingClientRect();
      for (let fromName in this.productStatus) {
        const fromProd = this.productStatus[fromName];
        // 高亮和目的相关的才需划线
        const {
          satisfied: fromSatisfied,
          unsatisfied: fromUnsatisfied,
          required: fromRequired,
          partial: fromPartial,
          highlighted: fromHighlighted,
          targeted: fromTargeted,
        } = fromProd.statusObj || {};
        // 左节点满足这些情况才需划线
        const needToDrawLeft = fromSatisfied ||
          (fromUnsatisfied && fromRequired) ||
          fromPartial ||
          fromHighlighted ||
          fromTargeted;
        if (needToDrawLeft && fromProd.from) {
          for (let to of fromProd.from) {
            const toName = to.name;
            const toProd = this.productStatus[toName];
            const {
              satisfied: toSatisfied,
              unsatisfied: toUnsatisfied,
              required: toRequired,
              partial: toPartial,
              highlighted: toHighlighted,
              owned: toOwned,
            } = toProd.statusObj || {};
            // 线条颜色
            let color = 'grey'; // 默认灰色
            if (toSatisfied) {
              color = 'darkgreen'
            } else if (toOwned) {
              color = 'blue';
            } else if (toPartial) {
              color = 'orange';
            } else if (toRequired && toUnsatisfied) {
              color = 'red';
            }
            // 宽度
            let strokeWidth = '1px';
            if (fromHighlighted && toHighlighted) {
              strokeWidth = '3px';
            }
            // 右边节点满足条件
            const needToDrawRight = toSatisfied ||
              (toUnsatisfied && toRequired) ||
              toOwned ||
              toSatisfied ||
              toHighlighted ||
              toPartial;
            // 画线
            if (needToDrawRight) {
              this.drawALineBetween(document.getElementById(fromName), document.getElementById(toName), relativePos, color, strokeWidth);
            }
          }
        }
      }
    },
    // 从dev1的右中连线至div2的左中
    drawALineBetween(div1, div2, relativePos = {x: 0, y: 0}, color="black", strokeWidth = '1px') {
      if (!div1 || !div2 || !div1.getBoundingClientRect) return;
      // console.log('drawALineBetween', div1, div2);
      const fromPoint = this.getDivRightCenter(div1);
      const toPoint = this.getDivLeftCenter(div2);
      const newId = `id-${div1.id}-${div2.id}`;
      let svg = d3.select(`#${newId} line`);
      // console.log("div1 pos:", fromPoint.x, fromPoint.y);
      // console.log("div2 pos:", fromPoint.x, fromPoint.y);
      // console.log("rel pos:", relativePos.x, relativePos.y);
      if (!document.getElementById(newId)) {
        const width = toPoint.x - fromPoint.x;
        const height = Math.abs(toPoint.y - fromPoint.y);
        // from DIV比较高时
        const svgPosition = {
          left: fromPoint.x - relativePos.x,
          top: fromPoint.y - relativePos.y,
        };
        const linePosition = {
          start: { x: 1, y: 0 },
          end: { x: width - 1, y: height}
        }
        // 如果to DIV比较高
        if (fromPoint.y > toPoint.y) {
          svgPosition.top = toPoint.y - relativePos.y;
          linePosition.start.y = height;
          linePosition.end.y = 0;
        }
        svg = d3
          .select('.resource-content-wrapper')
          .append('svg')
          .attr('id', newId)
          .attr('width', width)
          .attr('height', Math.max(height, 3)) // 保留至少3px高度，防止同一层的情况
          .style('position', 'absolute')
          .style('left', svgPosition.left)
          .style('top', svgPosition.top)
          .append("line")
          .attr("x1", linePosition.start.x)
          .attr("y1", linePosition.start.y)
          .attr("x2", linePosition.end.x)
          .attr("y2", linePosition.end.y)
      }
      // 颜色和宽度
      svg
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth);
      // return svg;
    }
  }
}
</script>

<style lang="less">
.planet-resources-wrapper {
  .mode-select-wrapper {
    border-bottom: 2px solid black;
  }
  .resource-selector {
    width: 200px;
    border-right: 2px solid black;
  }
  .products-status-wrapper {
    .status-title {
      padding: 0 1rem;
      white-space: nowrap;
    }
  }
  .resource-content-wrapper {
    position: relative;
    .products-level-wrapper {
      border-left: 1px dashed black;
      border-right: 1px dashed black;
      flex: 1 1 auto;
      .products-level-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
// 状态表示
.satisfied {
  border-color: darkgreen;
  color: darkgreen;
}
.required.unsatisfied {
  border-color: red;
  color: red;
}
.highlighted {
  border-left-width: 3px;
  border-right-width: 3px;
  * {
    font-weight: bold;
  }
}
.partial {
  border-color: orange;
  color: orange;
}
.owned {
  border-color: blue;
  color: blue;
}
.targeted {
  border-color: purple !important;
  border-left-width: 3px;
  border-right-width: 3px;
  // color: purple;
}
</style>