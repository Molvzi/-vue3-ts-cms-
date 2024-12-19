<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

//0.定义props

interface IProps {
  modalConfig: {
    header: {
      newTitle: string
      editTitle: string
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formItems: any[]
  }
}

const props = defineProps<IProps>()

//1.定义内部的属性
const dialogVisible = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

//2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

//2.定义设置dialogVisible的方法
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    //编辑时数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    //新建时数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

//3.定义确定按钮的逻辑
function handleConfirm() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    //编辑用户
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    //创建新部门
    systemStore.newPageDataAction('department', formData)
  }
}

//将属性和方法暴露出去
defineExpose({
  setModalVisible
})
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
