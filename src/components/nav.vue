<template>
    <div id="bet">
        <div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav>
        <b-nav-item  exact exact-active-class="active">INSERISCI SCOMMESSA</b-nav-item>
        <b-nav-item>GIORNATA PRECEDENTE</b-nav-item>
        <b-nav-item>CLASSIFICA GENERALE</b-nav-item>
        <b-nav-item ><b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button></b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
            <router-view></router-view>
    </b-card-body>
  </b-card>
</div>
</div>
</template>
<script>
import betComponent from './bet.vue';

export default{

        data(){
                return;
        },
        mounted(){
            if(!localStorage.getItem("jwt"))
                this.$router.replace({ name: "login" });
               },
        methods:{
                logout: function() {
                localStorage.removeItem("jwt");
                this.$router.replace({ name: "login" });
                }
        }
        }
</script>
<style scoped>

</style>