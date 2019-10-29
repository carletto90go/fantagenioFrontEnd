<template>
    <!-- https://github.com/carletto90go/fantagenioFrontEnd.git -->
    <div id="ourNavBar">
            <!-- <b-card title="Card Title" no-body> -->
                    <b-nav class="masterNav">
                        <b-img src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>
                        <h6><b-button class="menuSingolo" v-if="showButton" v-on:click="clickScommessa">INSERISCI SCOMMESSA</b-button></h6>
                        <b-nav-item v-if="!showButton" disabled>INSERISCI SCOMMESSA</b-nav-item>
                        <h6><b-button class="menuSingolo" v-if="showButton" v-on:click="clickPrec">GIORNATA PRECEDENTE</b-button></h6>
                        <b-nav-item v-if="!showButton" disabled>GIORNATA PRECEDENTE</b-nav-item>
                        <h6><b-button class="menuSingolo" v-if="showButton" v-on:click="clickStandings">CLASSIFICA GENERALE</b-button></h6>
                        <b-nav-item v-if="!showButton" disabled>CLASSIFICA GENERALE</b-nav-item>

                                <b-nav-item-dropdown class="labelNome">
                                    <template  v-slot:button-content>
                                        <b-button>{{username.toUpperCase()}}</b-button>
                                    </template>
                                    <b-dropdown-item >                        
                                        <b-button v-if="showButton" v-on:click="clickChangePwd">CAMBIA PASSWORD</b-button>
                                        <b-button v-if="!showButton" disabled>CAMBIA PASSWORD</b-button>
                                    </b-dropdown-item>
                                    <b-dropdown-item><b-button type="button" variant="danger" v-on:click="logout()" >DISCONNETTI</b-button>
                                    </b-dropdown-item>
                                </b-nav-item-dropdown> 
                        </b-nav>
            <!-- </b-card> -->
            <betComponent v-if="betActive" @betReady="betReady" @dbError="handlerDbError"/>
            <standingsComponent v-if="standingsActive" @standingsReady="betReady" @dbError="handlerDbError"/>
            <precComponent v-if="precActive" @lastGameReady="betReady" @dbError="handlerDbError"/>
            <changePwdComponent v-if="changePwdActive" @passChanged="betReady" @dbError="handlerDbError"/>
            <b-button pill block size="lg" class="buttonServer" variant="danger" v-if="dbError" type="button" v-on:click="refresh">Riprova, Problema server!</b-button>
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
            if(this.changePwdActive) return this.changePwdActive = false;
            // eslint-disable-next-line
            console.log(error);
        },
        refresh(){
            // eslint-disable-next-line
            console.log("refreshing...");
            this.betActive = true;
            this.dbError = false;
        }
    }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.masterNav{
    width: 100%;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
    background-color: #9cc938;
    border-bottom: 2px solid #023a5b;

}

.labelNome{
    text-decoration-color: black;
    position: relative;
    left: 16%;
}
.menuSingolo{
    background-color: #023a5b;
    font-weight: bold;
    margin: 15% 0 0 15%; 
    box-shadow:  3px 3px 3px black;
}
.buttonServer{
    align-content: center;
}
</style>