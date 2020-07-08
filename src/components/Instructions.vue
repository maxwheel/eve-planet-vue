<template>
  <div class="instructions-wrapper">
    <div class="instruction">
      <h3>操作说明</h3>
      <div>
        <ul>
          <li>左键点击：高亮前置/后置产物</li>
          <li>右键点击：显示详情</li>
          <li>Ctrl+左键点击：添加/删除其为已有产物</li>
          <li>Alt+左键点击：添加/删除其为目标产物</li>
        </ul>
      </div>
    </div>
    <div class="instruction">
      <h3>产物图示</h3>
      <div>
        <div class="satisfied">满足前置条件，可生产的产物</div>
        <div class="required unsatisfied">尚缺乏的、无法建造的产物</div>
        <div class="partial">部分满足建造条件的产物</div>
        <div class="owned">已拥有的产物</div>
        <div>
          <span class="targeted" style="border-top-width: 1px; border-bottom-width: 1px; border-style: solid; border-radius: 6px; padding: 0 6px;">设定的目标产物</span>
        </div>
        <div>
          <span class="highlighted" style="border-top-width: 1px; border-bottom-width: 1px; border-style: solid; border-radius: 6px; padding: 0 6px;">
            <span>高亮的相关产物</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.instructions-wrapper {
  text-align: left;
  padding: 0.5rem 1rem;
  .instruction {
    > div {
      padding-left: 1rem;
    }
  }
}
</style>