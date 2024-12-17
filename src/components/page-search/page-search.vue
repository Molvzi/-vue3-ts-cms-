<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="props.searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的表单 -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        size="large"
        type="primary"
        icon="Search"
        @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

//定义自定义事件/接受的属性
interface IProps {
  searchConfig: {
    labelWidth?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

//定义搜索表单的数据
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

//重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  //1.将form中的数据全部重置
  formRef.value?.resetFields()

  //2.将事件传出去,content内部重新发送网络请求
  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}

//查询操作
</script>

<style lang="less" scoped>
.search {
  background: white;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
