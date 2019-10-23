<template>
    <div id="lastgame" class="text-center">
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
            widgetData : {
                tableLoadingSpinner : false
            },
            round : 1,
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
            this.round = resultLastGame.data.response[0].round;
            const optionsThe = {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                    }};
            this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=4332&r="+this.round+"&s=1920", optionsThe)
            .then( theSportsDb => {
                for(let i = 0; i<theSportsDb.data.events.length; i++) {
                    let tableItem = {
                        "match": theSportsDb.data.events[i].strEvent,
                        "resultCorrect": theSportsDb.data.events[i].intHomeScore + " - " + theSportsDb.data.events[i].intAwayScore
                        }
                    resultLastGame.data.response.forEach( match => {
                        if(match.idMatch == theSportsDb.data.events[i].idEvent){
                            tableItem.betCR = match.homeGoals.toString() + " - " + match.awayGoals.toString();
                            tableItem.bet1x2 = match.bet1x2;
                            console.log(match);
                            tableItem.points = 0;
                            if(match.win1x2) tableItem.points += 1;
                            if(match.winResult) tableItem.points += 3;
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
  width:60%;
  margin: 30px auto;
  background:#F1F1F1;
  padding-top:10px;
  padding-left:40px;
  padding-right:40px;
}
</style>