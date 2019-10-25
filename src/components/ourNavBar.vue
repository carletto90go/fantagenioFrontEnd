<template>
    <!-- https://github.com/carletto90go/fantagenioFrontEnd.git -->
    <div id="ourNavBar" class="text-center">
            <b-card title="Card Title" no-body>
                <!-- <b-card-header header-tag="nav"> -->
                    <b-nav>
                        <b-img src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>
                        <h6><b-nav-item class="menuSingolo" v-if="showButton" v-on:click="clickScommessa">INSERISCI SCOMMESSA</b-nav-item></h6>
                        <b-nav-item v-if="!showButton" disabled>INSERISCI SCOMMESSA</b-nav-item>
                        <h6><b-nav-item class="menuSingolo" v-if="showButton" v-on:click="clickPrec">GIORNATA PRECEDENTE</b-nav-item></h6>
                        <b-nav-item v-if="!showButton" disabled>GIORNATA PRECEDENTE</b-nav-item>

                        <h6><b-nav-item class="menuSingolo" v-if="showButton" v-on:click="clickStandings">CLASSIFICA GENERALE</b-nav-item></h6>
                        <b-nav-item v-if="!showButton" disabled>CLASSIFICA GENERALE</b-nav-item>
                         <h4><b-nav-item class="menuSingolo" v-if="showButton" v-on:click="clickChangePwd">CAMBIA PASSWORD</b-nav-item></h4>
                        <b-nav-item v-if="!showButton" disabled>CAMBIA PASSWORD</b-nav-item>
                                <b-nav-item-dropdown right>
                                <!-- Using 'button-content' slot -->
                                <template v-slot:button-content>
                                    <em class="labelNome">CIAO, {{username.toUpperCase()}}</em>
                                </template>
                                <b-dropdown-item href="#"><b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button></b-dropdown-item>
                                </b-nav-item-dropdown> 
                        </b-nav>
                <!-- </b-card-header> -->
            </b-card>
            <betComponent v-if="betActive" @betReady="betReady" @dbError="handlerDbError"/>
            <standingsComponent v-if="standingsActive" @standingsReady="betReady" @dbError="handlerDbError"/>
            <precComponent v-if="precActive" @lastGameReady="betReady" @dbError="handlerDbError"/>

            <changePwdComponent v-if="changePwdActive" @changePwdReady="betReady" @dbError="handlerDbError"/>

            <b-button variant="outline-danger" v-if="dbError" type="button" v-on:click="refresh">Riprova, Problema server!</b-button>

    </div>
</template>

<script>
import betComponent from './bet.vue';
import standingsComponent from './generalStandings.vue';
import precComponent from './lastGame.vue';
import changePwdComponent from './changePwd.vue';

export default {
    name: 'ourNavBar',
    data(){
                return {
                    showButton : true,
                    betActive : true,
                    precActive: false,
                    standingsActive: false,
                    changePwdActive : false,
                    dbError: false,
                    username:""
                };
        },
        components: {
            betComponent,
            standingsComponent,
            precComponent,
            changePwdComponent
        },
    mounted(){
        if(!localStorage.getItem("jwt"))
            this.$router.push({ name: "login" });
            else{
                this.username = localStorage.getItem("username");
            }
           },
    methods: {
        logout: function() {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            this.$router.push({ name: "login" });
            },
        clickScommessa() {
            if(!this.betActive) this.showButton = false;
            this.betActive = true;
            this.precActive = false;
            this.standingsActive = false;
            this.changePwdActive = false;
            },
        clickPrec() {
            if(!this.precActive) this.showButton = false;
            this.betActive = false;
            this.precActive = true;
            this.standingsActive = false;
            this.changePwdActive = false;
            },
        clickStandings() {
            if(!this.standingsActive) this.showButton = false;
            this.betActive = false;
            this.precActive = false;
            this.standingsActive = true;
            this.changePwdActive = false;
            },
        clickChangePwd() {
            if(!this.clickChangePwd) this.showButton = false;
            this.betActive = false;
            this.precActive = false;
            this.standingsActive = false;
            this.changePwdActive = true;
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
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.labelNome{
    text-align: right;
}
.menuSingolo{
    margin-top: 55px;
}
</style>