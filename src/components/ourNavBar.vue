<template>
    <div id="ourNavBar" class="text-center">
            <b-card title="Card Title" no-body>
                <b-card-header header-tag="nav">
                    <b-nav>
                        <b-img src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>
                        <b-nav-item v-if="showButton" v-on:click="clickScommessa">INSERISCI SCOMMESSA</b-nav-item>
                        <b-nav-item v-if="!showButton" disabled>INSERISCI SCOMMESSA</b-nav-item>
                        <b-nav-item v-if="showButton" v-on:click="clickPrec">GIORNATA PRECEDENTE</b-nav-item>
                        <b-nav-item v-if="!showButton" disabled>GIORNATA PRECEDENTE</b-nav-item>
                        <b-nav-item v-if="showButton" v-on:click="clickStandings">CLASSIFICA GENERALE</b-nav-item>
                        <b-nav-item v-if="!showButton" disabled>CLASSIFICA GENERALE</b-nav-item>
                           
                        <b-nav-item><b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button></b-nav-item>
                    </b-nav>
                </b-card-header>
            </b-card>
            <betComponent v-if="betActive" @betReady="betReady" @dbError="handlerDbError"/>
            <standingsComponent v-if="standingsActive" @standingsReady="betReady" @dbError="handlerDbError"/>
            <precComponent v-if="precActive" @lastGameReady="betReady" @dbError="handlerDbError"/>
            <b-button v-if="dbError" type="button" v-on:click="refresh">TRY AGAIN</b-button>
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
                    showButton : true,
                    betActive : true,
                    precActive: false,
                    standingsActive: false,
                    dbError: false
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
            if(!this.betActive) this.showButton = false;
            this.betActive = true;
            this.precActive = false;
            this.standingsActive = false;
            },
        clickPrec() {
            if(!this.precActive) this.showButton = false;
            this.betActive = false;
            this.precActive = true;
            this.standingsActive = false;
            },
        clickStandings() {
            if(!this.standingsActive) this.showButton = false;
            this.betActive = false;
            this.precActive = false;
            this.standingsActive = true;
            },
        betReady(dataFun){
            this.dbError = false;
            this.showButton = dataFun;
            },
        handlerDbError(error){
            this.dbError = true;
            if(this.betActive) return this.betActive = false;
            if(this.standingsActive) return this.standingsActive = false;
            if(this.precActive) return this.precActive = false;
            console.log(error);
        },
        refresh(){
            console.log("refreshing...");
            this.betActive = true;
            this.dbError = false;
        }
    }
}
</script>