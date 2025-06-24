import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // 路由懒加载
        component: () => import('../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 