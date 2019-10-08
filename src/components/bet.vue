<template>
    <div id="bet">
        <button type="button" v-on:click="logout()" >DISCONNETTI</button>
        <!-- <button type="button" v-on:click="getMatch()" >Dati</button> -->
        <h1>Giornata Numero {{numeroGiornata}}</h1>
        <div>
              <b-table striped hover :items= items :fields="fields"></b-table>
        </div>
        <!-- <pre>
          {{this.authenticated}}
        </pre> -->
    </div>
</template>

<script>
    export default {
        name: 'bet',
        data() {
            return {
              numeroGiornata: 1,
                  fields: [
          {
            key: 'match',
            sortable: false
          },
          {
            key: 'id',
            sortable: false
          },
          {
            key: 'awayTeam',
            label: 'Risultato Casa'
          },
          {
            key: 'homeTeam',
            label: 'Risultato Ospite'
          },
          {
            key: 'matchDate',
            label: 'Risultato 1X2'
          },
          {
            key: 'matchTime',
            label: 'ora'
          }
        ],
        items: getMatch()

            };
        },
        methods:{
                 logout: function() {
               
                this.$router.replace({ name: "login" });
              
            },
            /*  getMatch : async function() {
               const options = {
	                     	method: 'GET',
	                	headers: {
			                          'Content-Type': 'application/json'
	          	}};
              let responseMatch = await this.axios.get("https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4332", options);
              // let responseJson = await responseMatch.json();
              console.log(responseMatch);
              let teams = responseMatch.data.events;
              console.log(teams);
              let nextMatches = {};
              nextMatches.matches = [];
              
              //giornata
              nextMatches.round = teams[0].intRound;
              for (let i =0; i<10; i++) { 
	              	nextMatches.matches.push({
		            	"match": teams[i].strEvent,
                  "id": teams[i].idEvent,
                  "awayTeam" : teams[i].strAwayTeam,
                  "homeTeam" : teams[i].strHomeTeam,
                  "matchDate" : teams[i].dateEvent,
                  "matchTime" : teams[i].strTime
		            	});
              }
              console.log(nextMatches.matches);
             
                  return nextMatches.matches[0];     
            } */

            getMatch: function(){
              return {
                match: "unvaloreacaso",
                id: "id",
                awayTeam: "away",
                homeTeam: "home",
                matchDate: "date",
                matchTime: "time"
              }
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
</style>