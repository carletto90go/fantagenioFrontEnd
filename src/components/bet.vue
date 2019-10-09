<template>
    <div id="bet">
        <div>
        <b-button type="button" variant="outline-danger" v-on:click="logout()" >DISCONNETTI</b-button>
        </div>
        <div>
        <h1>Giornata Numero {{numeroGiornata}}</h1>
        </div>
        <div>
              <b-table striped hover responsive :items="getMatch" :fields="fields">
                <template v-slot:cell(correctResult)="row">
                  <b-form-select v-model="result" :options="optionsCorrectResult" size="sm" class="mt-3"></b-form-select>
                </template>
                <template v-slot:cell(bet1x2)="row">
                  <b-form-select v-model="bet1x2" :options="optionsBet1x2" size="sm" class="mt-3"></b-form-select>
                </template>
              </b-table>
        </div>
        <div>
        <b-button class="buttonInvio" variant="success" type="button" v-on:click="invioDati()" >INVIO SCOMMESSA</b-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'bet',
        data() {
            return {
                result: null,
                optionsCorrectResult: [
                { value: null, text: 'Inserire risultato' },
                { value: '1', text: '0-0' },
                { value: '2', text: '1-0' },
                { value: '3', text: '1-1' },
                { value: '4', text: '2-2' },
                { value: '5', text: '2-1' },
                { value: '6', text: '2-0' },
                { value: '7', text: '1-2' },
                { value: '8', text: '0-2' },
                { value: '9', text: '3-0' },
                { value: '10', text: '0-3' },
                { value: '11', text: '1-3' },
                { value: '12', text: '3-1' },
        ],
                bet1x2: null,
                optionsBet1x2: [
                { value: null, text: 'Inserire risultato esatto' },
                { value: 'a', text: '1' },
                { value: 'b', text: '2' },
                { value: 'c', text: 'X' },
        ],

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
            logout: function() {
                localStorage.removeItem("jwt");
                this.$router.replace({ name: "login" });
            },
            invioDati(){
              alert("dati inviati");
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
    #buttonInvio {
      text-align: right;
    }
</style>