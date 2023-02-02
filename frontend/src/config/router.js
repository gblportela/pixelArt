import { createRouter, createWebHistory } from 'vue-router'

import Feed from '@/components/Feed'
import Auth from '@/components/Auth'
import Draw from '@/components/Draw'
import MyArts from '@/components/MyArts'
import Art from '@/components/Art'
import axios from 'axios'
import { userKey } from '@/global'

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
    name: 'myarts',
    path: '/myarts',
    component: MyArts
}]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) =>{
    const json = localStorage.getItem(userKey)
    const user = JSON.parse(json)
    if(user)
    axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
    next()
})

export default router