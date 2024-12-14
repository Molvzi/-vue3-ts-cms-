<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import { ref } from 'vue'

//对content组件的操作
const contentRef = ref<InstanceType<typeof userContent>>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleQueryClick(formData: any) {
  console.log(formData)
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
</script>

<style lang="less" scoped>
.user {
  color: #000;
  border-radius: 8px;
  overflow: hidden;
}
</style>
