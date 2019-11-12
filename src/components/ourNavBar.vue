<template>
    <!-- https://github.com/carletto90go/fantagenioFrontEnd.git -->
    <div id="ourNavBar">
        <b-nav class="masterNav">
            <b-img src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>
            <h6><b-button class="menuSingolo" v-if="showButton" v-on:click="clickScommessa">INSERISCI SCOMMESSA</b-button></h6>
            <!-- <b-nav-item v-if="!showButton" disabled>INSERISCI SCOMMESSA</b-nav-item> -->
            <h6><b-button class="menuSingolo" v-if="showButton" v-on:click="clickPrec">GIORNATA PRECEDENTE</b-button></h6>
            <!-- <b-nav-item v-if="!showButton" disabled>GIORNATA PRECEDENTE</b-nav-item> -->
            <h6><b-button class="menuSingolo" v-if="showButton" v-on:click="clickStandings">CLASSIFICA GENERALE</b-button></h6>
            <!-- <b-nav-item v-if="!showButton" disabled>CLASSIFICA GENERALE</b-nav-item> -->

                <b-nav-item-dropdown class="labelNome">
                    <template  v-slot:button-content>
                        <b-button>{{jwtPayload.username.toUpperCase()}}</b-button>
                    </template>
                    <b-dropdown-item >
                        <b-button v-if="showButton" v-on:click="clickChangePwd">CAMBIA PASSWORD</b-button>
                        <b-button v-if="!showButton" disabled>CAMBIA PASSWORD</b-button>
                    </b-dropdown-item>
                    <b-dropdown-item >
                        <b-button v-if="showButton" v-on:click="clickSelectLeague">SELEZIONA LEGA</b-button>
                        <b-button v-if="!showButton" disabled>SELEZIONA LEGA</b-button>
                    </b-dropdown-item>
                    <b-dropdown-item >
                        <b-button v-if="showButton && jwtPayload.role==1" v-on:click="clickAdmin">ADMIN</b-button>
                        <b-button v-if="!showButton && jwtPayload.role==1" disabled>ADMIN</b-button>
                    </b-dropdown-item>
                    <b-dropdown-item >
                        <b-button v-if="showButton && jwtPayload.role==2" v-on:click="clickLeagueAdmin">LEAGUE ADMIN</b-button>
                        <b-button v-if="!showButton && jwtPayload.role==2" disabled>LEAGUE ADMIN</b-button>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <b-button type="button" variant="danger" v-on:click="logout()" >DISCONNETTI</b-button>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>
        <betComponent v-if="activeComponent.betActive"  @betReady="betReady" @dbError="handlerDbError"/>
        <standingsComponent v-if="activeComponent.standingsActive"  @standingsReady="betReady" @dbError="handlerDbError"/>
        <precComponent v-if="activeComponent.precActive"  @lastGameReady="betReady" @dbError="handlerDbError"/>
        <changePwdComponent v-if="activeComponent.changePwdActive" @betReady="betReady" @passChanged="betReady" @dbError="handlerDbError"/>
        <selectLeagueComponent v-if="activeComponent.selectLeagueActive" @betReady="betReady" @changedLeague="clickScommessa" @dbError="handlerDbError"/>
        <adminComponent v-if="activeComponent.adminActive" @betReady="betReady" @dbError="handlerDbError"/>
        <leagueAdminComponent v-if="activeComponent.leagueAdminActive" @betReady="betReady" @dbError="handlerDbError"/>
        <b-button pill block size="lg" class="buttonServer" variant="danger" v-if="dbError" type="button" v-on:click="refresh">Riprova, Problema server!</b-button>
    </div>
</template>

<script>
import vueJwtDecode from 'vue-jwt-decode'

import betComponent from './bet.vue';
import standingsComponent from './generalStandings.vue';
import precComponent from './lastGame.vue';
import changePwdComponent from './changePwd.vue';
import selectLeagueComponent from './selectLeague.vue';
import adminComponent from './admin.vue';
import leagueAdminComponent from './leagueAdmin.vue';

export default {
    name: 'ourNavBar',
    data(){
        return {
            jwtPayload : null,
            activeComponent : {
                 "betActive" : true ,
                 "precActive" : false ,
                 "standingsActive" : false ,
                 "changePwdActive" : false ,
                 "selectLeagueActive" : false,
                 "adminActive" : false,
                 "leagueAdminActive" : false
                },
            showButton : true,
            dbError: false
        };
    },
        components: {
            betComponent,
            standingsComponent,
            precComponent,
            changePwdComponent,
            selectLeagueComponent,
            adminComponent,
            leagueAdminComponent
        },
    created(){
        if(!localStorage.getItem("jwt")) this.$router.push({ name: "login" });
        else this.jwtPayload = vueJwtDecode.decode(localStorage.getItem("jwt")); //Ok!
        },
    methods: {
        logout: function() {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
            localStorage.removeItem("leagueId");
            this.$router.push({ name: "login" });
            },
        clickScommessa() {
            if(!this.betActive) this.showButton = false;
            this.switchComponent("betActive");
            },
        clickPrec() {
            if(!this.precActive) this.showButton = false;
            this.switchComponent("precActive");
            },
        clickStandings() {
            if(!this.standingsActive) this.showButton = false;
            this.switchComponent("standingsActive");
            },
        clickChangePwd() {
            if(!this.changePwdActive) this.showButton = false;
            this.switchComponent("changePwdActive");
        },
        clickSelectLeague() {
            if(!this.selectLeagueActive) this.showButton = false;
            this.switchComponent("selectLeagueActive");
        },
        clickAdmin(){
            if(!this.adminActive) this.showButton = false;
            this.switchComponent("adminActive");
        },
        clickLeagueAdmin(){
            if(!this.leagueAdminActive) this.showButton = false;
            this.switchComponent("leagueAdminActive");
        },
        betReady(dataFun){
            this.dbError = false;
            this.showButton = dataFun;
            },
        handlerDbError(error){
            this.dbError = true;
        },
        refresh(){
            this.switchComponent("betActive");
            this.dbError = false;
        },
        switchComponent(activeCpt){ //switch to activeCpt component
            this.activeComponent["betActive"] = false;
            this.activeComponent["standingsActive"] = false;
            this.activeComponent["precActive"] = false;
            this.activeComponent["changePwdActive"] = false;
            this.activeComponent["selectLeagueActive"] = false;
            this.activeComponent["adminActive"] = false;
            this.activeComponent["leagueAdminActive"] = false;
            this.activeComponent[activeCpt] = true;
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