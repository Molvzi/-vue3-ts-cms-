<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">用户列表</h3>
        <el-button type="primary">新建用户</el-button>
      </div>
      <div class="table">表格</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background: #fff;

  .header{
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;

    .title{
      font-size: 22px;
    }
  }
}
</style>
