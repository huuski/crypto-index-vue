import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'
import Exchange from './views/Exchange'

Vue.use(Router)

export default new Router({

    mode: 'history',
    base: '/login',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/exchange',
            name: 'exchange',
            component: Exchange
        }
    ]

})