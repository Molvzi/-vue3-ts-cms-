import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '../global/constanants'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

//导航守卫
//参数:to(跳转的位置),from(从哪里跳转)
//返回值:返回值决定导航的路径(不返回或者返回undefined,则不跳转)
router.beforeEach((to) => {
  //只有登录成功(token),才能访问main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  //如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
