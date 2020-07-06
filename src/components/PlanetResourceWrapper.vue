<template>
  <v-container class="planet-resources-wrapper">
    <v-row class="mode-select-wrapper flex-column">
      <h1>行星制造产物管理</h1>
    </v-row>
    <v-row>
      <v-expansion-panels accordion multiple v-model="defaultPanelStatus">
        <!-- 产物状态 -->
        <v-expansion-panel>
          <v-expansion-panel-header>产物状态</v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- 已有 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title">已有: {{ ownedProductNames.length }}个</div>
              <div>
                <v-chip-group>
                  <v-chip v-for="name in ownedProductNames" :key="name">
                    {{ JSON.stringify(name) }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <!-- 可造 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title">可造: {{ satisfiedProductNames.length }}个</div>
              <div>
                <v-chip-group>
                  <v-chip v-for="name in satisfiedProductNames" :key="name">
                    {{ name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <!-- 目标 -->
            <div class="products-status-wrapper flex-row align-items-center">
              <div class="status-title">目标: {{ targetProductNames.length }}个</div>
              <div>
                <v-chip-group>
                  <v-chip v-for="name in targetProductNames" :key="name">
                    {{ name }}
                  </v-chip>
                </v-chip-group>
              </div>
            </div>
            <!-- 仍需要 -->
            <div class="products-status-wrapper flex-row align-items-center"></div>

          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- 产物图 -->
        <v-expansion-panel>
          <v-expansion-panel-header>详情</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="resource-content-wrapper flex-row width-100">
              <!-- p4 -->
              <div class="products-level-wrapper">
                <div>P4</div>
                <div class="products-level-container">
                  <ProductItem
                    v-for="item in planetResources.p4.items"
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
              <!-- p3 -->
              <div class="products-level-wrapper">
                <div>P3</div>
                <div class="products-level-container">
                  <ProductItem
                    v-for="item in planetResources.p3.items"
                    :key="item.name"
                    :item="item"
                    @highlight-product="highlightRelatedItems($even.namet)"
                    @show-product-detail="showProductDetail($event)"
                    @toggle-owned="toggleOwned($event.name)"
                    @toggle-target="toggleTarget($event.name)"
                  />
                </div>
              </div>
              <!-- 留空为连线 -->
              <div class="products-level-interval"></div>
              <!-- p2 -->
              <div class="products-level-wrapper">
                <div>P2</div>
                <div class="products-level-container">
                  <ProductItem
                    v-for="item in planetResources.p2.items"
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
              <!-- p1 -->
              <div class="products-level-wrapper">
                <div>P1</div>
                <div class="products-level-container">
                  <ProductItem
                    v-for="item in planetResources.p1.items"
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
              <!-- p0 -->
              <div class="products-level-wrapper">
                <div>P0</div>
                <div class="products-level-container">
                  <ProductItem
                    v-for="item in planetResources.p0.items"
                    :key="item.name"
                    :item="item"
                    @highlight-product="highlightRelatedItems($event.name)"
                    @show-product-detail="showProductDetail($event)"
                    @toggle-owned="toggleOwned($event.name)"
                    @toggle-target="toggleTarget($event.name)"
                  />
                </div>
              </div>
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
    <v-overlay :value="isDetailModalShown">
      <ProductDetailModal :product="detailedProduct" />
      <v-btn
        icon
        @click="isDetailModalShown=false"
      >
        <v-icon color="error">mdi-close</v-icon>
      </v-btn>
    </v-overlay>
  </v-container>
</template>

<script>
import { planetResources } from '../utils/planetReources';
import ProductItem from './ProductItem';
import ProductDetailModal from './ProductDetailModal';
import Instructions from './Instructions';

export default {
  components: { ProductItem, ProductDetailModal, Instructions },
  data: () => ({
    defaultPanelStatus: [0, 1, 2],
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
    ownedProductNames() {
      return Object.keys(this.ownedProducts).filter(p => this.ownedProducts[p]);
    },
    targetProductNames() {
      return Object.keys(this.targetProducts).filter(p => this.targetProducts[p]);
    },
    satisfiedProductNames() {
      return Object.keys(this.satisfiedProducts).filter(p => this.satisfiedProducts[p]);
    },
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
      // 遍历产品
      const productTypes = ['p0', 'p1', 'p2', 'p3', 'p4'];
      // 从p0开始遍历产品
      for (let type of productTypes) {
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
          } else {
            // 尝试搜索当前产物的from是否被满足。
            // 因为当前产物的依赖必然来自底层，所以已经被处理过
            if (item.from) {
              for (let fromItem of item.from) {
                const satisfied = this.ownedProducts[fromItem.name] || satisfiedProducts[fromItem.name];
                // 处理from产物
                fromItem.satisfied = satisfied;
                fromItem.unsatisfied = !satisfied;
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
            item.satisfied = satisfiedProducts[item.name];
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
      // 强制刷新
      // this.$forceUpdate();
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
    }
  }
  .resource-content-wrapper {
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
  border-width: 3px;
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
  border-color: purple;
  color: purple;
}
</style>