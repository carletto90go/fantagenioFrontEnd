import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import navComponent from "./components/nav.vue"
import betComponent from './components/bet.vue';

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
            children: [
                // Note we provide the above parent route name on the default child tab
                // route to ensure this tab is rendered by default when using named routes
                { path: '/bet', component: betComponent, name: 'bet' }
              ]
        }

    ]
})

export default router