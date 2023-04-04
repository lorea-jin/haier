import { createRouter, createWebHashHistory } from 'vue-router'

const home = () => import('@/views/layout.vue')
const index1 = () => import('@/views/index01.vue')
const index2 = () => import('@/views/index02.vue')
const index3 = () => import('@/views/index03.vue')
const index4 = () => import('@/views/index04.vue')
const index5 = () => import('@/views/index05.vue')
const index6 = () => import('@/views/index06.vue')
const index7 = () => import('@/views/index07.vue')
const index8 = () => import('@/views/index08.vue')
const index9 = () => import('@/views/index09.vue')


const routes = [
  {
    path: '/',
    component: home,
    meta: { title: 'Home', isShow: true },
    children: [
      { path: '/01', component: index1, meta: { title: '商用二线质量生产信息看板', isShow: false } },
      { path: '/02', component: index2, meta: { title: '双系统充氦回收机', isShow: false } },
      { path: '/03', component: index3, meta: { title: '抽真空', isShow: false } },
      { path: '/04', component: index4, meta: { title: '冷媒灌注', isShow: false } },
      { path: '/05', component: index5, meta: { title: '卤检', isShow: false } },
      { path: '/06', component: index6, meta: { title: '安全性能测试', isShow: false } },
      { path: '/07', component: index7, meta: { title: '商用质量生产信息看板', isShow: false } },
      { path: '/08', component: index8, meta: { title: '商用二线在线履历', isShow: false } },
			{ path: '/09', component: index9, meta: { title: '下线及提升机监控', isShow: false } },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
