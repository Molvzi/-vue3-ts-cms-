<template>
  <div class="app">
    <h2>App</h2>
    <router-link to="/main">主要</router-link>
    <router-link to="/login">登录</router-link>

    <router-view />
    <el-button type="success">Success</el-button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: aqua;
}
</style>
