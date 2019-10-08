<template>
    <div id="app">
        <div id="nav">
        <!-- <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>   -->
        </div>
         <router-view @authenticated="getAuthenticated()" />

    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "dio",
                    password: "porco"
                }
            }
        },

        methods: {
         /*    mounted() {
            if(this.authenticated) {
                this.$router.replace({ name: "login" });
            }}, */

            setAuthenticated: function(status) {
                this.authenticated = status;
            },
            getAuthenticated: function(){
                console.log(this.authenticated);
                return this.authenticated;
            },
            logout: function() {
              if( this.authenticated == false){
                this.router.replace({ name: "login" });
              }

            }
        }
    }
</script>
<script>
/* import Login from './components/Login.vue'
export default {
   name: 'app',
   components: {
     Login
   }
 } */
</script>
<style>
 #app {
   background: #76b852;
   background: -webkit-linear-gradient(right, #525eb8, #6fa1c2);
   background: -moz-linear-gradient(right, #525eb8, #6fa1c2);
   background: -o-linear-gradient(right, #525eb8, #6fa1c2);
   background: linear-gradient(to left, #525eb8, #6fa1c2);
   font-family: "Roboto", sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}
 body {
    background: -webkit-linear-gradient(right, #525eb8, #6fa1c2);
}
</style>