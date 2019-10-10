<template>
    <div id="bet">
        <div>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav>
        <b-nav-item active>Scommessa</b-nav-item>
        <b-nav-item>Classifica</b-nav-item>
        <b-nav-item>Giornata precedente</b-nav-item>
        <b-nav-item ><b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button></b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-text>
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
        <div>
        <b-button class="buttonInvio" variant="success" type="button" v-on:click="invioDati()" >INVIO SCOMMESSA</b-button>
        </div>
      </b-card-text>

      
    </b-card-body>
  </b-card>
</div>
        <b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button>
        
    
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
            logout: function() {
                localStorage.removeItem("jwt");
                this.$router.replace({ name: "login" });
                },
            invioDati(){
                // fare post
                for(let i=0; i<10; i++){
                    if(this.bet1x2[i] && this.correctResult[i]) {
                        this.templatePostMatches[i].bet1x2 = this.bet1x2[i];
                        this.templatePostMatches[i].homeGoals = this.correctResult[i][0];
                        this.templatePostMatches[i].awayGoals = this.correctResult[i][1];
                        this.postMatches.request.push(this.templatePostMatches[i]);
                        }
                    }
                const jwt = localStorage.getItem("jwt");
                console.log(this.postMatches.request);
                const options = {
                    method: 'POST',
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Content-Type': 'application/json',
                        'auth-token' : jwt
                        }
                };

                this.axios.post("https://hidden-ocean-91661.herokuapp.com/api/user/matches", this.postMatches, options)
                .then( response => {
                    console.log(response);
                    });
            },
            getMatch (ctx) {
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
                        console.log(nextMatches.matches[i].matchDate);

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