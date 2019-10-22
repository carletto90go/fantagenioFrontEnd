<template>
    <div id="ourNavBar">
            <b-card title="Card Title" no-body>
                <b-card-header header-tag="nav">
                    <b-nav>
                        <b-img src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>   
                        <b-nav-item v-on:click="clickScommessa">INSERISCI SCOMMESSA</b-nav-item>
                        <b-nav-item v-on:click="clickPrec">GIORNATA PRECEDENTE</b-nav-item>
                        <b-nav-item v-on:click="clickStandings">CLASSIFICA GENERALE</b-nav-item>
                        <b-nav-item><b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button></b-nav-item>
                    </b-nav>
                </b-card-header>
            </b-card>
            <betComponent v-if="betActive" />
            <standingsComponent v-if="standingsActive" />
            <precComponent v-if="precActive" />
    </div>
</template>

<script>
import betComponent from './bet.vue';
import standingsComponent from './generalStandings.vue';
import precComponent from './lastGame.vue';

export default {
    name: 'ourNavBar',
    data(){
                return {
                    betActive : true,
                    precActive: false,
                    standingsActive: false
                };
        },
        components: {
            betComponent,
            standingsComponent,
            precComponent
        },
    mounted(){
        if(!localStorage.getItem("jwt"))
            this.$router.push({ name: "login" });
           },
    methods: {
        logout: function() {
            localStorage.removeItem("jwt");
            this.$router.push({ name: "login" });
            },
        clickScommessa() {
            this.betActive = true;
            this.precActive = false;
            this.standingsActive = false;
            },
        clickPrec() {
            this.betActive = false;
            this.precActive = true;
            this.standingsActive = false;
            },
        clickStandings() {
            this.betActive = false;
            this.precActive = false;
            this.standingsActive = true;
            },
        }
}
</script>