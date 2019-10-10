import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import betComponent from "./components/bet.vue"
import alertComponent from "./components/alert.vue"
Vue.use(Router)

let router =  new Router({
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent,
            meta: {
                loggedIn : false
            }
        },
        {
            path: "/bet",
            name: "bet",
            component: betComponent,
            meta: {
                loggedIn : true
            }
        },
        {
            path: "/alert",
            name: "alert",
            component: alertComponent
        }
    ]
})

export default router