import { createRouter, createWebHistory } from 'vue-router'

import Feed from '@/components/Feed'
import Auth from '@/components/Auth'
import Draw from '@/components/Draw'
import MyArts from '@/components/MyArts'
import Art from '@/components/Art'

const routes = [
{
   name: 'art',
   path: '/art',
   component: Art
}, {
    name: 'feed',
    path: '/',
    component: Feed
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'draw',
    path: '/draw',
    component: Draw
},{
    name: 'MyArts',
    path: '/MyArts',
    component: MyArts
}]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router