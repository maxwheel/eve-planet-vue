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
        <div class="satisfied">满足前置条件，可生产</div>
        <div class="required unsatisfied">尚缺乏的</div>
        <div class="partial">部分满足建造条件的</div>
        <div class="owned">已有的</div>
        <div><span class="targeted" style="border-width: 1px; border-style: solid">建造目标</span></div>
        <div class="highlighted"><span>与点击产物相关的</span></div>
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