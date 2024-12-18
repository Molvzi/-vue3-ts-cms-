<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader"> world:{{ scope.row[scope.prop] }} </span>
      </template>
      <template #parent="scope">
        <span class="parent"> hhhhh:{{ scope.row[scope.prop] }} </span>
      </template>
    </page-content>
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

//点击search,content的操作
const contentRef = ref<InstanceType<typeof pageContent>>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
//点击content,modal的操作
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.leader {
  color: seagreen;
}
.parent {
  color: red;
}
</style>
