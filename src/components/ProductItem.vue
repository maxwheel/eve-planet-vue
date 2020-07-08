<template>
  <div
    v-if="item"
    class="product-item flex-row"
    :class="item.statusObj"
    @click.exact.stop="$emit('highlight-product', item)"
    @click.right.exact.stop.prevent="$emit('show-product-detail', item)"
    @click.ctrl.exact.stop="$emit('toggle-owned', item)"
    @click.alt.exact.stop="$emit('toggle-target', item)"
  >
    <div class="product-name" :id="item.name">
      <span>{{ item.name }}</span>
    </div>
    <!-- <div class="product-from flex-row" v-if="item.from">
      <div class="product-from-item" v-for="from in item.from" :key="from.name">
        {{ from.name }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>

<style lang="less">
.product-item {
  position: relative;
  width: 9rem;
  // height: 80px;
  margin: 0.25rem 0.5rem;
  border: 1px solid grey;
  border-radius: 6px;
  background-color: white;
  z-index: 1; // 把产物放到连线上层
  .product-name {
    padding: 0.25rem 0.5rem;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
}
</style>