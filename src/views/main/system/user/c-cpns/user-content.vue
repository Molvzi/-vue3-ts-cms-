<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">用户列表</h3>
        <el-button type="primary">新建用户</el-button>
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
            <el-button type="primary" size="small" icon="Edit" text
              >编辑</el-button
            >
            <el-button type="danger" size="small" icon="Delete" text
              >删除</el-button
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'

//1.发起action,请求userList的数据
const systemStore = useSystemStore()
systemStore.postUsersListAction()

//2.获取userList数据,进行展示
const { usersList } = storeToRefs(systemStore)
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
</style>
