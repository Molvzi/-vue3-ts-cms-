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
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import userMainStore from '@/store/main/main'
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//0.对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = userMainStore()
  const department = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...department)
    }
  })

  return modalConfig
})

//点击search,content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

//点击content,modal的操作
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style lang="less" scoped></style>
