<template>
  <div class="main-menu">
    <!-- 1.logo部分 -->
    <div class="logo">
      <img class="img" src="../../assets/img/logo.svg" alt="" />
      <h2 class="title">Pinia 管理系统</h2>
    </div>
    <!-- 2.menu部分 -->
    <div class="menu">
      <el-menu
        default-active="3"
        active-text-color="#fff"
        background-color="#001529"
        text-color="#b7bdc3"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'

//1.获取动态的菜单数据
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
console.log('userMenus', userMenus)
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #0a091e;
}
.logo {
  display: flex;
  height: 28px;
  padding: auto 20px;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #08121b;
  }

  .el-menu-item:hover {
    background-color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
