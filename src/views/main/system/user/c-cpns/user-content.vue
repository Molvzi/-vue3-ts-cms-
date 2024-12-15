<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">用户列表</h3>
        <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
      </div>
      <div class="table">
        <el-table :data="usersList" border style="width: 100%">
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="60"
          />
          <el-table-column
            align="center"
            prop="name"
            label="用户名"
            width="120"
          />
          <el-table-column
            align="center"
            prop="realname"
            label="真实姓名"
            width="120"
          />
          <el-table-column
            align="center"
            prop="cellphone"
            label="电话号码"
            width="150"
          />
          <el-table-column align="center" prop="enable" label="状态" width="80">
            <!-- 作用域插槽 -->
            <template #default="scope">
              <el-button
                size="small"
                :type="scope.row.enable ? 'success' : 'danger'"
                plain
                >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createAt" label="创建时间">
            <!-- 作用域插槽 -->
            <template #default="scope">
              {{ formatUTC(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="updateAt" label="更新时间">
            <template #default="scope">
              {{ formatUTC(scope.row.updateAt) }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="150">
            <template #default="scope">
              <el-button type="primary" size="small" icon="Edit" text>
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
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          size="default"
          layout="sizes, prev, pager, next, jumper,total"
          :total="usersTotalCount"
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

//定义事件
const emit = defineEmits(['newClick'])

//1.发起action,请求userList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

//2.获取userList数据,进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

//3.页码相关逻辑

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

//4.定义函数,用于发送网络请求
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchUserListData(formData: any = {}) {
  //1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { offset, size }

  //2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

//5.编辑和删除的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

//6.新建用户的操作
function handleNewUserClick() {
  emit('newClick')
}

defineExpose({
  fetchUserListData
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
