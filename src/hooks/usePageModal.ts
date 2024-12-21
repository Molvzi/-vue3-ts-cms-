import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
