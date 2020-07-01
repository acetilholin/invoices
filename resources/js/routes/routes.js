import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from "../views/Home";
import LoginRegister from "../auth/LoginRegister";
import NewPassword from "../views/NewPassword";


const routes = [
    {
        path: '/',
        component: Home,
        meta: { requiresAuth: true }

    },
    {
        path: '/login-register',
        component: LoginRegister
    },
    {
        path: '/new-password',
        component: NewPassword
    }
]

const router = new VueRouter({
    routes
})

export default router
