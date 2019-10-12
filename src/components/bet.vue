<template>
    <div id="bet">
        <div>
            <h1>Giornata Numero {{numeroGiornata}}</h1>
        </div>
        <div>
              <b-table striped hover responsive :items="getMatch" :fields="fields">
                <template v-slot:cell(correctResult)="row">
                     <inputCompCorrectResult :parentIndex="row.index" @listenerInputCorrectResult="inputCorrectResultFun" />
                </template>
                <template v-slot:cell(bet1x2)="row">
                     <inputComp1x2 :parentIndex="row.index" @listenerInput1x2="input1x2Fun" />
                </template>
              </b-table>
       </div>
       <div class="text-center">
       <b-spinner v-if="loadingSpinner" variant="success" label="Spinning" ></b-spinner>
       <b-button v-b-modal.modal-1 v-if="!loadingSpinner" class="buttonInvio" variant="success" type="button" v-on:click="invioDati()" >INVIO SCOMMESSA</b-button>
        <b-modal id="modal-1" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
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
                loadingSpinner : false,
                sendDataResponse : {},
                correctResult: [],
                bet1x2: [],
                postMatches: {
                    request : []
                    },
                templatePostMatches : [{},{},{},{},{},{},{},{},{},{}],
                numeroGiornata: null, 
                fields: [
                   {
                    key: 'matchDate',
                    sortable: false,
                    label: 'Data Partita'
                  },
                  {
                    key: 'match',
                    sortable: false,
                    label: 'Incontro'
                  },
                  {
                    key: 'correctResult',
                    label: 'Risultato Esatto'
                  },
                  {
                    key: 'bet1x2',
                    label: "1 x 2"
                  }
                ],
            }
        },
        mounted(){
            if(!localStorage.getItem("jwt"))
                this.$router.replace({ name: "login" });
        },

        methods: {
            input1x2Fun: function(dataFun){
              this.bet1x2[dataFun.index] = dataFun.inputBet;
                },
            inputCorrectResultFun: function(dataFun){
              this.correctResult[dataFun.index] = dataFun.inputBet;
                },
            
            invioDati(){

                for(let i=0; i<10; i++){
                    if(this.bet1x2[i] && this.correctResult[i]) {
                        this.templatePostMatches[i].bet1x2 = this.bet1x2[i];
                        this.templatePostMatches[i].homeGoals = this.correctResult[i][0];
                        this.templatePostMatches[i].awayGoals = this.correctResult[i][1];
                        this.postMatches.request.push(this.templatePostMatches[i]);
                        }
                    }
                const jwt = localStorage.getItem("jwt");
                const options = {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Content-Type': 'application/json',
                        'auth-token' : jwt
                        }
                };

                return this.axios.post("https://hidden-ocean-91661.herokuapp.com/api/user/matches", this.postMatches, options)
                .then( response => {
                        this.sendDataResponse = response;
                        this.postMatches = { request : [] };
                        this.loadingSpinner = false;
                    });
            },
            getMatch () {
                const options = {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json'
                }};
                const responseMatchh = this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4332", options);

                return responseMatchh.then( responseMatch => {
                    let teams = responseMatch.data.events;
                    let nextMatches = {};
                    nextMatches.matches = [];
                    
                    this.numeroGiornata = teams[0].intRound;
                    for (let i =0; i<10; i++) {
                        nextMatches.matches.push({
                            "match": teams[i].strEvent,
                            "id": teams[i].idEvent,
                            "awayTeam" : teams[i].strAwayTeam,
                            "homeTeam" : teams[i].strHomeTeam,
                            "matchDate" : teams[i].strDate,
                            "matchTime" : teams[i].strTime
                        });

                        //da creare New Date cit. ghiuttolo
                        nextMatches.matches[i].matchDate += " " + nextMatches.matches[i].matchTime.substring(0, nextMatches.matches[i].matchTime.length -9);
                        nextMatches.matches[i].matchDate = nextMatches.matches[i].matchDate.substring(0, 6) + "20" + nextMatches.matches[i].matchDate.substring(6, nextMatches.matches[i].matchDate.lenght);

                        this.templatePostMatches[i].idMatch = teams[i].idEvent;
                        this.templatePostMatches[i].homeTeam = teams[i].strHomeTeam;
                        this.templatePostMatches[i].awayTeam = teams[i].strAwayTeam;
                        this.templatePostMatches[i].round = parseInt(teams[i].intRound);
                        this.templatePostMatches[i].matchDate = nextMatches.matches[i].matchDate;
                    }

                    return nextMatches.matches;
                });
            }

        }
    }
</script>

<style scoped>
    #bet {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
    #logout {
      align-content: right;
    }
</style>