import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '../global/constanants'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
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
})

export default router
