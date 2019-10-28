<template>
    <div id="lastgame" class="text-center">
       <b-form-select v-if="!widgetData.tableLoadingSpinner" v-model="select.round" @change="roundSelect" :options="select.optionsRound" size="sm" class="mt-3" />
       <b-form-select v-if="!widgetData.tableLoadingSpinner" v-model="select.user" @change="userSelect" :options="select.optionsUser" size="sm" class="mt-3" />
       <b-table v-if="!widgetData.tableLoadingSpinner" striped hover responsive :items="tableDataLastGame.items" :fields="tableDataLastGame.fields">
       </b-table>
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
         const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token' : jwt
        }};
        this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/myPrediction", options)
        .then( resultLastGame =>{
            this.select.round = resultLastGame.data.response[0].round;
            for(let i = 1; i<=this.select.round; i++) this.select.optionsRound.push(i);

            this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/users", options)
            .then( users => {
                users.data.response.forEach( user => {
                    this.select.user = resultLastGame.data.response[0].utente;
                    this.select.optionsUserId.push({ username : user.username, userId : user.id });
                    this.select.optionsUser.push(user.username);
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
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'auth-token' : jwt
            }};
            this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/prediction/"+user+"?round="+round, options)
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
      label: 'Punti Guadagnati'
    }
  ];
</script>

<style scoped>

#lastgame{
  width:100%;
  margin: 30px auto;
  background: transparent;
  padding: 0 0 0 0;
}
/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { 
    #lastgame{
      width:100%;
    }
 }

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
       #lastgame{
      width:100%;
    }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
       #lastgame{
      width:80%;
    }
 }

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { 
       #lastgame{
      width:70%;
    }

 }
</style>