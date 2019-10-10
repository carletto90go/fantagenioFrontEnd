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
                    key: 'bet1x2'
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
              console.log(this.bet1x2);
              console.log(this.correctResult);
              
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