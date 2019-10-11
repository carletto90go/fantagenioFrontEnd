import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import navComponent from "./components/nav.vue"


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
            path: "/nav",
            name: "nav",
            component: navComponent,
            meta: {
                loggedIn : true
            },
        }

    ]
})

export default router