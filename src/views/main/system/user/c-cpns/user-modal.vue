<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="500" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名:" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名:" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="电话号码:" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入电话号码"
            />
          </el-form-item>
          <el-form-item label="选择角色:" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门:" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system';
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
//1.定义内部的属性
const dialogVisible = ref(true)
const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

//2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

//2.定义设置dialogVisible的方法
function setModalVisible() {
  dialogVisible.value = true
}

//3.定义确定按钮的逻辑
function handleConfirm() {
  dialogVisible.value = false
  //创建新用户
  systemStore.newUserDataAction(formData)
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
