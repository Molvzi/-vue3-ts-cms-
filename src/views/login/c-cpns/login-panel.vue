<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">CMS系统</h1>
    <!-- 中间tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <paneAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 2.手机登录的pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link target="_blank">忘记密码</el-link>
    </div>
    <el-button class="login-btn" size="large" @click="handleLoginBtnClick()"
      >Login</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache';

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd,(newVal)=>{
  localCache.setCache('isRemPwd',newVal)
})
//------定义了一个 accountRef 变量，它是一个对 paneAccount 组件实例的引用。------
const accountRef = ref<InstanceType<typeof paneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
    if(isRemPwd.value){

    }
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
}
.title {
  color: aliceblue;
  text-align: center;
  margin-bottom: 15px;
}
.label {
  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    margin-left: 5px;
  }
}
.controls {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  margin-top: 10px;
  width: 100%;
}
</style>
