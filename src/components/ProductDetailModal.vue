<template>
  <div class="product-detail-modal flex-row">
    <div>
      <div class="product-title">
        <h2>{{ product.name }}</h2>
      </div>
      <!-- 前置产物 -->
      <div class="product-from flex-column" v-if="product.from">
        <div class="product-from-title">
          <h4>输入:</h4>
        </div>
        <div class="product-from-wrapper flex-column">
          <div class="product-from-product"
            v-for="fromItem in product.from"
            :key="fromItem.name"
            :class="{satisfied: fromItem.satisfied}"
          >
            <span>{{ fromItem.name }}</span>
            <span v-show="fromItem.satisfied">（已满足）</span>
            <span v-show="!fromItem.satisfied">（未满足）</span>
          </div>
        </div>
      </div>
      <!-- 星球 -->
      <div class="product-from flex-column" v-if="product.fromPlanet">
        <div class="product-from-title">
          <h4>来自星球:</h4>
        </div>
        <div class="product-from-wrapper flex-column">
          <div class="product-from-product"
            v-for="fromItem in product.fromPlanet"
            :key="fromItem"
          >
            <span>{{ fromItem }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  },
  data: () => {
    return {
      isVisible: false, // 是否可见
    };
  },
}
</script>

<style lang="less">
.product-detail-modal {
  width: 600px;
  height: 400px;
  padding: 3rem;
  background-color: white;
  color: black;
  border-radius: 1rem;
  > * {
    margin-bottom: 1rem;
  }
  .product-title {
    line-height: 1rem;
  }
  .product-from {
    .product-from-wrapper {
      .product-from-product {
        margin-left: 1rem;
      }
    }
  }
}
</style>