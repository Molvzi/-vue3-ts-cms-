/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '../../global/constanants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登录,获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      //2.获取用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id) //携带token发送网络请求(从localStorage中获取)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      //3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      //4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      //5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //!!!动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route: RouteRecordRaw) => router.addRoute('main', route))

      //5.页面跳转
      router.push('/main')
    },

    loadLocalCacheAction() {
      //1.用户进行刷新时,重新加载本地缓存
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        //1.请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        //!!!动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route: RouteRecordRaw) =>
          router.addRoute('main', route)
        )
      }
    }
  }
})

export default useLoginStore
