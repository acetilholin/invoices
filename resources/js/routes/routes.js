import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from "../views/Home";
import LoginRegister from "../auth/LoginRegister";
import NewPassword from "../views/NewPassword";
import Customers from "../views/Customers";
import FinalInvoices from "../views/FinalInvoices";
import Statistics from "../views/Statistics";
import Website from "../views/Website";
import Users from "../views/Users";
import Company from "../views/Company";
import Klavzule from "../views/Klavzule";
import Months from "../views/Months";

const routes = [
    {
        path: '/',
        component: Home,
        meta: {requiresAuth: true}

    },
    {
        path: '/customers',
        component: Customers,
        meta: {requiresAuth: true}

    },
    {
        path: '/final-invoices',
        component: FinalInvoices,
        meta: {requiresAuth: true}
    },
    {
        path: '/statistics',
        component: Statistics,
        meta: {requiresAuth: true}
    },
    {
        path: '/website',
        component: Website,
        meta: {requiresAuth: true}
    },
    {
        path: '/users',
        component: Users,
        meta: {requiresAuth: true}
    },
    {
        path: '/login-register',
        component: LoginRegister
    },
    {
        path: '/new-password',
        component: NewPassword
    },
    {
        path: '/company',
        component: Company,
        meta: {requiresAuth: true}
    },
    {
        path: '/months',
        component: Months,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/klavzule',
        component: Klavzule,
        meta: {requiresAuth: true}
    }
]

const router = new VueRouter({
    routes
})

export default router
