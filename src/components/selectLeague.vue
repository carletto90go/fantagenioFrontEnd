<template>
    <div id="selectLeague">
        <div>
            <b-button v-for="i in myLeagues" :key="i.leagueId" v-on:click="updateLeagueId(i.leagueId)">{{i.league.leagueName}}</b-button>
        </div>
    </div>
</template>

<script>
  export default {
        name: 'selectLeague',
        data() {
            return {
                myLeagues : []
            }
        },

        mounted() {
            const jwt = localStorage.getItem("jwt");
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token' : jwt
                }};
            this.axios.get( process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/myleagues", options)
            .then( leagues => {
                leagues.data.request.forEach( league => {
                    this.myLeagues.push(league);
                });
                this.$emit("betReady", true);
            })
            .catch(e => {
                this.$emit("dbError", e);
            });

        },
        methods: {
            updateLeagueId(i){
                localStorage.setItem("leagueId", i);
                this.$emit("changedLeague", true);
            }
        }
    }
</script>
<style scoped>

</style>