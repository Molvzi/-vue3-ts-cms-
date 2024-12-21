<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
        <el-button type="primary" @click="handleNewUserClick">
          {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
        </el-button>
      </div>
      <div class="table">
        <el-table :data="pageList" border style="width: 100%">
          <template v-for="item in contentConfig.propsList" :key="item.prop">
            <template v-if="item.type === 'timer'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  {{ formatUTC(scope.row[item.prop]) }}
                </template>
              </el-table-column>
            </template>

            <template v-else-if="item.type === 'handler'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    icon="Edit"
                    text
                    @click="handleEditBtnClick(scope.row)"
                  >
                    编辑
                  </el-button>

                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    text
                    @click="handleDeleteBtnClick(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </template>

            <template v-else-if="item.type === 'custom'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope" :prop="item.prop">
                  </slot>
                </template>
              </el-table-column>
            </template>

            <template v-else>
              <el-table-column align="center" v-bind="item" />
            </template>
          </template>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          size="default"
          layout="sizes, prev, pager, next, jumper,total"
          :total="pageTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import type { IPageContentProps } from './type'

// interface IProps {
//   contentConfig: {
//     pageName: string
//     header?: {
//       title: string
//       btnTitle?: string
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     propsList: any[]
//   }
// }

const prop = defineProps<IPageContentProps>()

//定义事件
const emit = defineEmits(['newClick', 'editClick'])

//1.发起action,请求userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

//2.获取userList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//3.页码相关逻辑

function handleSizeChange() {
  fetchPageListData()
}

function handleCurrentChange() {
  fetchPageListData()
}

//4.定义函数,用于发送网络请求
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchPageListData(formData: any = {}) {
  //1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { offset, size }

  //2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(prop.contentConfig.pageName, queryInfo)
}

//5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(prop.contentConfig.pageName, id)
}
function handleNewUserClick() {
  emit('newClick')
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({
  fetchPageListData
})
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}

.table {
  .el-table_cell {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
