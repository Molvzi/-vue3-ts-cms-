/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  //1.1 读取router/main文件夹下的所有ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  //1.2 将所有的路由添加到localRoutes中
  for (const key in files) {
    const module = files[key]
    console.log(module.default)
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  //1.加载本地路由
  const localRoutes = loadLocalRoutes()

  //2.根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if(!routes.find((item)=>item.path === menu.url)){
          routes.push({path:menu.url,redirect:route.path})
        }
        //2.将二级菜单添加到routes中
        routes.push(route)
      }
      //记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 *  根据路径匹配需要的菜单
 * @param path 需要匹配的路径
 * @param userMenus 用户的菜单
 * @returns 匹配到的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path?: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  //1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []
  //2.遍历获得面包屑的层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        //1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        //2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
