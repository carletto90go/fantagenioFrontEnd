import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import betComponent from "./components/bet.vue"
import alertComponent from "./components/alert.vue"
Vue.use(Router)

export default new Router({
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
            component: LoginComponent
        },
        {
            path: "/bet",
            name: "bet",
            component: betComponent
        },
        {
            path: "/alert",
            name: "alert",
            component: alertComponent
        }
    ]
})