<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="role">
    <page-search :search-config="searchConfig"/>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config';
</script>

<style lang="less" scoped>
.role {
  color: #000;
}
</style>
