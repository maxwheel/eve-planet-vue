<template>
  <v-dialog v-model="show" width="400" persistent no-click-animation>
    <v-card>
      <v-card-title class="headline" primary-title>
        {{ product.name }}
      </v-card-title>
      <v-card-text>
        <div class="product-from" v-if="product.from">
          <div class="product-from-title">
            <h4>输入:</h4>
          </div>
          <ul class="product-from-wrapper">
            <li class="product-from-product"
              v-for="fromItem in product.from"
              :key="fromItem.name"
              :class="{satisfied: fromItem.satisfied}"
            >
              <span>{{ fromItem.name }}</span>
              <span v-show="fromItem.satisfied">（已满足）</span>
              <span v-show="!fromItem.satisfied">（未满足）</span>
            </li>
          </ul>
        </div>
        <!-- 星球 -->
        <div class="product-from" v-if="product.fromPlanet">
          <div class="product-from-title">
            <h4>来自星球:</h4>
          </div>
          <ul class="product-from-wrapper">
            <li class="product-from-product"
              v-for="fromItem in product.fromPlanet"
              :key="fromItem"
            >
              <span>{{ fromItem }}</span>
            </li>
          </ul>
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn text block @click="closeDetailModal()" :color="closeButtonColor">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    product: {
      /**
       * 产物状态
       * .name: 名称
       * .statusObj: 状态
       * .from: 需求产物列表
       *    .satisfied 满足需求
       */
      type: Object,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      isVisible: false, // 是否可见
      closeButtonColor: 'black', // 关闭按钮的颜色
    };
  },
  beforeUpdate() {
    this.updateCloseButtonColor();
  },
  methods: {
    updateCloseButtonColor() {
      // console.log('this.product.statusObj', this.product.statusObj);
      let color = 'black';
      if (this.product && this.product.statusObj) {
        const {
          satisfied,
          unsatisfied,
          required,
          partial,
          owned,
        } = this.product.statusObj;
        if (satisfied) {
          color = 'dark-green';
        } else if (partial) {
          color = 'orange';
        } else if (owned) {
          color = 'blue';
        } else if (required && unsatisfied) {
          color = 'red';
        }
      }
      // console.log('color :', color);
      this.closeButtonColor = color;
    },
    closeDetailModal() {
      this.$emit('update:show', false);
      // this.show = false;
    }
  }
}
</script>

<style lang="less">
.product-title {
  // line-height: 1rem;
  margin-bottom: 1rem;
}
.product-from {
  .product-from-title {
    text-align: left;
  }
  .product-from-wrapper {
    .product-from-product {
      text-align: left;
      margin-left: 1rem;
    }
  }
}
</style>