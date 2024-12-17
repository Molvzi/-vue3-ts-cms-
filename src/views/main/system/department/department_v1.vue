<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'

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

<style lang="less" scoped></style>
