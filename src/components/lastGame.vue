<template>
    <div id="lastgame" class="text-center">
       <b-form-select v-if="!widgetData.tableLoadingSpinner" v-model="select.round" @change="roundSelect" :options="select.optionsRound" size="sm" class="mt-3" />
       <b-form-select v-if="!widgetData.tableLoadingSpinner" v-model="select.user" @change="userSelect" :options="select.optionsUser" size="sm" class="mt-3" />
       <b-table class="tabellaPrecedente" head-variant="light" v-if="!widgetData.tableLoadingSpinner" dark bordered small striped hover responsive :items="tableDataLastGame.items" :fields="tableDataLastGame.fields">
       </b-table>
         <template v-if="!widgetData.tableLoadingSpinner">
                <b-button class="legenda text-left" variant="info" @click="legenda('Legenda punti')" >Legenda punteggio</b-button>
         </template>
       <b-spinner class="text-center" v-if="widgetData.tableLoadingSpinner" variant="success" label="Spinningg" ></b-spinner>
    </div>    
</template>
<script>
// https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=441613 event by event Id

export default{
    name: 'lastgame',
    data(){
        return{
            select : {
                optionsRound : [],
                optionsUser : [],
                optionsUserId : [],
                user : 1,
                round : 1
            },
            widgetData : {
                tableLoadingSpinner : false
            },
            tableDataLastGame:{
                items: tableItems,
                fields: tableFields
            }
        }
    },
    mounted(){
        this.$emit("lastGameReady", false);
        this.widgetData.tableLoadingSpinner = true;
        const jwt = localStorage.getItem("jwt");
        const leagueId = localStorage.getItem("leagueId");
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token' : jwt,
            "league-id" : leagueId
        }};
        this.axios.get( process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/myPrediction", options)
        .then( resultLastGame =>{
            this.select.round = resultLastGame.data.response[0].round;
            for(let i = 1; i<=this.select.round; i++) this.select.optionsRound.push(i);

            this.axios.get( process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/users", options)
            .then( users => {
                users.data.response.forEach( user => {
                    this.select.user = resultLastGame.data.response[0].user.username; //utente loggato da myPred
                    this.select.optionsUserId.push({ username : user.user.username, userId : user.userId });
                    this.select.optionsUser.push(user.user.username);
                });
            });
            const optionsThe = {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                    }};
            this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=4332&r="+this.select.round+"&s=1920", optionsThe)
            .then( theSportsDb => {
                for(let i = 0; i<theSportsDb.data.events.length; i++) {
                    let tableItem = {
                        "match": theSportsDb.data.events[i].strEvent,
                        "resultCorrect": theSportsDb.data.events[i].intHomeScore + " - " + theSportsDb.data.events[i].intAwayScore
                        }
                    resultLastGame.data.response.forEach( match => {
                        if(match.idMatch == theSportsDb.data.events[i].idEvent){
                            tableItem.betCR = match.homeGoals.toString() + " - " + match.awayGoals.toString();
                            if(match.bet1x2 != 3){ tableItem.bet1x2 = match.bet1x2; }
                            else { tableItem.bet1x2 = "X"; }
                            tableItem.points = 0;
                            if(match.win1x2) { tableItem._cellVariants = { bet1x2 : "success" }; tableItem.points += 1; }
                            else tableItem._cellVariants = { bet1x2 : "danger" };
                            if(match.winResult) { /*tableItem._cellVariants= { betCR : "success" }; */ tableItem.points += 3;  }
                            //else tableItem._cellVariants= { betCR : "danger" };
                        }
                    });

                    tableItems.push(tableItem);
                    }
                this.$emit("lastGameReady", true);
                this.widgetData.tableLoadingSpinner = false;
                });
            })
            .catch(e => {
                this.$emit("dbError", e);
            });
    },
     beforeDestroy(){
        this.tableDataLastGame.items = null;
        tableItems = [];
    },

    methods : {
        legenda(variant = null) {
        this.$bvToast.toast('Risultato Esatto : PT.3 -  1X2 : PT.1', {
          title: ` ${variant || 'default'}`,
          variant: variant,
          solid: true
        })
      },
        roundSelect() {
            let i=0;
            while (this.select.optionsUserId[i].username != this.select.user) i++;
            this.executeGet(this.select.round, this.select.optionsUserId[i].userId);
        },
        userSelect() {
            let i=0;
            while (this.select.optionsUserId[i].username != this.select.user) i++;
            this.executeGet(this.select.round, this.select.optionsUserId[i].userId);
        },
        executeGet( round, user ) {
            this.tableDataLastGame.items = [];
            this.$emit("lastGameReady", false);
            this.widgetData.tableLoadingSpinner = true;
            const jwt = localStorage.getItem("jwt");
            const leagueId = localStorage.getItem("leagueId");
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token' : jwt,
                "league-id" : leagueId
            }};
            this.axios.get(process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/prediction/"+user+"?round="+round, options)
            .then( resultLastGame =>{
                const optionsThe = {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                }};
                this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=4332&r="+round+"&s=1920", optionsThe)
                .then( theSportsDb => {
                    for(let i = 0; i<theSportsDb.data.events.length; i++) {
                        let tableItem = {
                        "match": theSportsDb.data.events[i].strEvent,
                        "resultCorrect": theSportsDb.data.events[i].intHomeScore + " - " + theSportsDb.data.events[i].intAwayScore
                        }
                        resultLastGame.data.response.forEach( match => {
                            if(match.idMatch == theSportsDb.data.events[i].idEvent){
                                tableItem.betCR = match.homeGoals.toString() + " - " + match.awayGoals.toString();
                                if(match.bet1x2 != 3) { tableItem.bet1x2 = match.bet1x2; }
                                else {tableItem.bet1x2 = "X";}
                                tableItem.points = 0;
                                if(match.win1x2) { tableItem._cellVariants = { bet1x2 : "success" }; tableItem.points += 1; }
                                else { tableItem._cellVariants = { bet1x2 : "danger" }; }
                                if(match.winResult) { /*tableItem._cellVariants = { betCR : "success" }; */ tableItem.points += 3; }
                                //else tableItem._cellVariants = { betCR : "danger" };
                                }
                            });
                        this.tableDataLastGame.items.push(tableItem);
                    }
                    this.$emit("lastGameReady", true);
                    this.widgetData.tableLoadingSpinner = false;
                    });
                })
                .catch(e => {
                    this.$emit("dbError", e);
                });
            }
    }
}
let tableItems = [];
let tableFields = [
     {
      key: 'match',
      sortable: false,
      label: 'Partita'
    },
    {
      key: 'resultCorrect',
      sortable: false,
      label: 'Esito Incontro'
    },
    {
      key: 'bet1x2',
      sortable: false,
      label: '1 X 2 Pronosticato'
    },
    {
      key: 'betCR',
      sortable: false,
      label: 'Risultato Pronosticato'
    },
    {
      key: 'points',
      sortable: false,
      label: 'Punteggio'
    }
  ];
</script>

<style scoped>
.legenda{
    border-color: white;
    background-color: #454d55;
    box-shadow: #454d55
}
 .tabellaPrecedente{
    margin-top: 20px;
    box-shadow: 0 14px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
} 
</style>