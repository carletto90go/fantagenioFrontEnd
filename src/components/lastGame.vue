<template>
    <div id="lastgame">
       <b-table  striped hover responsive :items="tableDataLastGame.items" :fields="tableDataLastGame.fields">
       </b-table> 
    </div>    
</template>
<script>
export default{
    name: 'lastgame',
    data(){
        return{
            tableDataLastGame:{
                items: tableItems,
                fields: tableFields
            }
        }
    },
    mounted(){
        this.$emit("lastGameReady", false);
        const jwt = localStorage.getItem("jwt");
         const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token' : jwt
        }};
        this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/myPrediction?round=8", options)
        .then( resultLastGame =>{
            // eslint-disable-next-line
            for(let i =0; i<resultLastGame.data.response.length; i++) {
                let tableItem = {
                    "match": resultLastGame.data.response[i].homeTeam + "-" + resultLastGame.data.response[i].awayTeam,
                    "resultCorrect": resultLastGame.data.response[i].homeGoals + "-" + resultLastGame.data.response[i].awayGoals,
                    "bet1x2": resultLastGame.data.response[i].bet1x2,
                    "winResult": resultLastGame.data.response[i].winResult,
                    "win1x2": resultLastGame.data.response[i].win1x2,
                }
                tableItems.push(tableItem);
                }
            this.$emit("lastGameReady", true);
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
      label: 'Giocatore'
    },
    {
      key: 'resultCorrect',
      sortable: false,
      label: 'Risultato esatto'
    },
    {
      key: 'bet1x2',
      sortable: false,
      label: 'Risultato 1X2'
    },
    {
      key: 'winResult',
      sortable: false,
      label: 'Risultato esatto'
    },
    {
      key: 'win1x2',
      sortable: false,
      label: 'Risultato esatto'
    },
  ];
</script>

<style scoped>

</style>