<template>
    <div id="bet">
        <div>
            <h1 align="center">Giornata {{tableData.round}}</h1>
        </div>
        <div class="text-center">
            <b-table  class="tableCustom" head-variant="light" v-if="!widgetData.tableLoadingSpinner"  small dark striped hover responsive :items="tableData.items" :fields="tableData.fields">
                <template v-slot:cell(correctResult)="row">
                    <inputCompCorrectResult :parentIndex="row.index" :parentMatch="{ started : tableData.items[row.index].started, prediction : tableData.items[row.index].predictionCR }" @listenerInputCorrectResult="inputCorrectResultFun" />
                </template>
                <template v-slot:cell(bet1x2)="row">
                    <inputComp1x2 :parentIndex="row.index" :parentMatch="{ started : tableData.items[row.index].started, prediction : tableData.items[row.index].prediction }" @listenerInput1x2="input1x2Fun" />
                </template>
            </b-table>
            <b-spinner class="text-center" v-if="widgetData.tableLoadingSpinner" variant="success" label="Spinningg" ></b-spinner>
        </div>
        <div class="text-center">
            <b-spinner v-if="widgetData.sendSpinner" variant="success" label="Spinning" ></b-spinner>
            <b-button v-if="!widgetData.sendSpinner && !widgetData.tableLoadingSpinner" class="buttonInvio" variant="success" type="button" v-on:click="sendMatches()" >INVIO SCOMMESSA</b-button>
            <b-modal size="lg" ok-only ref="submitModal" title="Scommessa Inserita!">
                <h2>Scommesse Nuove</h2>
                <p v-for="i in sendMatchesData.sendDataResponse.created.length" :key="i">Created!</p>
                <h2>Scommesse Aggiornate</h2>
                <p v-for="i in sendMatchesData.sendDataResponse.updated.length" :key="i">Updated!</p>
                <h2>Scommesse Fallite perchè già iniziate</h2>
                <p v-for="i in sendMatchesData.sendDataResponse.failed.length" :key="i">Failed!</p>
            </b-modal>
        </div>
    </div>
</template>
<script>
import inputComp1x2 from './input1X2.vue';
import inputCompCorrectResult from './inputCorrectResult.vue';


export default {
    name: 'bet',
    components: {
        inputComp1x2,
        inputCompCorrectResult
    },
    data() {
        return {
            widgetData : {
                sendSpinner : false,
                tableLoadingSpinner : false
            },
            sendMatchesData : {
                sendDataResponse : {
                    created : [],
                    updated : [],
                    failed : []
                    },
                correctResult: [],
                bet1x2: [],
                postMatches: {
                    request : []
                    },
                templatePostMatches : [{},{},{},{},{},{},{},{},{},{}],
            },
            tableData: {
                started : false,
                round: null,
                items: tableItems,
                fields: tableFields
            }
        }
    },
    mounted(){
        //da rivedere started match
        this.$emit("betReady", false);
        this.widgetData.tableLoadingSpinner = true;
        const jwt = localStorage.getItem("jwt");
        const leagueId = localStorage.getItem("leagueId");
        const hiddenOptions = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token' : jwt,
            "league-id" : leagueId
            }};
        //controllo eventuali scommesse già inserite
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        }};
        //this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4332", options)
        this.axios.get(process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/currentRound", hiddenOptions)
        .then( resCurrentRound => {

            this.tableData.round = resCurrentRound.data + 1;

            this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsround.php?id=4332&r="+this.tableData.round+"&s=1920", options)
            .then( responseMatch => {
                //Ordino l'array per essere sicuro che il primo sia il primo in ordine temporale
                responseMatch.data.events.sort( function(a,b){
                    let matchDateA = new Date(a.dateEvent + "T" + a.strTime);
                    let matchDateB = new Date(b.dateEvent + "T" + b.strTime);
                    matchDateA = matchDateA.getTime();
                    matchDateB = matchDateB.getTime();
                    return matchDateA - matchDateB;
                    });

                //Vedo se i match sono iniziati
                let matchDateTS = new Date(responseMatch.data.events[0].dateEvent + "T" + responseMatch.data.events[0].strTime);
                matchDateTS = matchDateTS.getTime();
                let currentDateTS = Date.now();
                if(matchDateTS<currentDateTS)
                    this.tableData.started = true;

                let teams = responseMatch.data.events;
                this.axios.get( process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/myPrediction?round=" + this.tableData.round, hiddenOptions)
                .then( myPred => {
                    let predArray = myPred.data.response;
                    /*
                    if(predArray.length){
                        tableFields.push({
                            key: 'prediction',
                            sortable: false,
                            label: 'Pronostico'
                            });
                        }
                        */
                    for (let i=0; i<10; i++) {
                        let matchDateTS = new Date(teams[i].dateEvent + "T" + teams[i].strTime);
                        let strMatchDateTS = matchDateTS.toLocaleString();
                        strMatchDateTS = strMatchDateTS.substring(0, strMatchDateTS.length - 3 );
                        let tableItem = {
                            "match": teams[i].strEvent,
                            "id": teams[i].idEvent,
                            "awayTeam" : teams[i].strAwayTeam,
                            "homeTeam" : teams[i].strHomeTeam,
                            "matchDate" : strMatchDateTS,
                            "matchTime" : teams[i].strTime,
                            "prediction" : null,
                            "predictionCR": null,
                            "started": false
                        }
                        for(let j=0; j < predArray.length; j++){
                            if(predArray[j].idMatch == parseInt(teams[i].idEvent)) {
                                tableItem.predictionCR = [ predArray[j].homeGoals, predArray[j].awayGoals ];
                                tableItem.prediction = predArray[j].bet1x2;
                                if(!tableItem.prediction) tableItem.prediction="X";
                                }
                        }
                        matchDateTS = matchDateTS.getTime();
                        //let currentDateTS = Date.now();
                        //if(matchDateTS<currentDateTS)
                        tableItem.started = this.tableData.started;

                        tableItems.push(tableItem);

                        this.sendMatchesData.templatePostMatches[i].idMatch = teams[i].idEvent;
                        this.sendMatchesData.templatePostMatches[i].homeTeam = teams[i].strHomeTeam;
                        this.sendMatchesData.templatePostMatches[i].awayTeam = teams[i].strAwayTeam;
                        this.sendMatchesData.templatePostMatches[i].round = parseInt(teams[i].intRound);
                        this.sendMatchesData.templatePostMatches[i].matchDate = matchDateTS;
                        }
                    this.$emit("betReady", true);
                    this.widgetData.tableLoadingSpinner = false;
                    })
                    .catch( e => {
                        this.$emit("dbError", e);
                    });
                })
                .catch( e =>{
                    this.$emit("dbError", e);
                });
            });
        },
    beforeDestroy(){
        this.tableData.items = null;
        tableItems = [];
        //if(tableFields.length == 5) tableFields.pop();
    },
    methods: {
        input1x2Fun: function(dataFun){
          this.sendMatchesData.bet1x2[dataFun.index] = dataFun.inputBet;
            },
        inputCorrectResultFun: function(dataFun){
          this.sendMatchesData.correctResult[dataFun.index] = dataFun.inputBet;
            },
        toggleSubmitModal () {
            //due elementi da utilizzare per visualizzare, come?
            //console.log(this.sendMatchesData.templatePostMatches);
            //console.log(this.sendMatchesData.sendDataResponse);
            this.$refs["submitModal"].show();
            },
        sendMatches(){
            this.widgetData.sendSpinner = true;
            for(let i=0; i<10; i++){
                if(this.sendMatchesData.bet1x2[i]) {
                    this.sendMatchesData.templatePostMatches[i].bet1x2 = this.sendMatchesData.bet1x2[i];
                    }
                if(this.sendMatchesData.correctResult[i]) {
                    this.sendMatchesData.templatePostMatches[i].homeGoals = this.sendMatchesData.correctResult[i][0];
                    this.sendMatchesData.templatePostMatches[i].awayGoals = this.sendMatchesData.correctResult[i][1];
                    }
                if(this.sendMatchesData.templatePostMatches[i].bet1x2 || this.sendMatchesData.templatePostMatches[i].homeGoals) {
                    this.sendMatchesData.postMatches.request.push(this.sendMatchesData.templatePostMatches[i]);
                    }
                }
            const jwt = localStorage.getItem("jwt");
            const leagueId = localStorage.getItem("leagueId");
            const options = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json',
                    'auth-token' : jwt,
                    "league-id" : leagueId
                    }
            };
            return this.axios.post( process.env.VUE_APP_ENVIRONMENT_SECRET + "api/user/matches", this.sendMatchesData.postMatches, options)
            .then( response => {
                    this.sendMatchesData.sendDataResponse = response.data;
                    this.sendMatchesData.postMatches = { request : [] };
                    this.widgetData.sendSpinner = false;
                    this.toggleSubmitModal();
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
      key: 'matchDate',
      sortable: false,
      label: 'Data Partita'
    },
    {
      key: 'match',
      sortable: false,
      label: 'Partita'
    },
    {
      key: 'correctResult',
      label: 'Risultato Esatto'
    },
    {
      key: 'bet1x2',
      label: "1 x 2"
    }
  ];
</script>

<style scoped>
.tableCustom{
    box-shadow: 0 14px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
}
    #logout {
      align-content: right;
    }
</style>