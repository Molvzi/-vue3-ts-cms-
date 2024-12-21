<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu">
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style lang="less" scoped>
.menu {
  color: #000;
}
</style>
