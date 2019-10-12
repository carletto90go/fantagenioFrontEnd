import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import navComponent from "./components/ourNavBar.vue"


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
            path: "/ourNavBar",
            name: "ourNavBar",
            component: navComponent,
            meta: {
                loggedIn : true
            },
        }

    ]
})

export default router