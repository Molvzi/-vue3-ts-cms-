<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick"/>
    <page-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import { ref } from 'vue'

//点击search,content的操作
const contentRef = ref<InstanceType<typeof pageContent>>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
</script>

<style lang="less" scoped></style>
