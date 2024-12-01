<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constanants'
import router from '@/router';
import { localCache } from '@/utils/cache'

function handleExitClick() {
  //1.删除token
  localCache.removeCache(LOGIN_TOKEN)
  //2.跳转到登录页面
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: #000;
}
button {
  margin-top: 20px;
  color: aquamarine;
  background-color: #000;
}
</style>
