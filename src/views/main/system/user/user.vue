<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <user-search />
    <user-content />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue';
</script>

<style lang="less" scoped>
.user {
  color: #000;
  border-radius: 8px;
  overflow: hidden;
}
</style>
