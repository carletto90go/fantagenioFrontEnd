<template>
    <div id="generalStandings" class="text-center">
        <b-table v-if="!widgetData.tableLoadingSpinner" id="table" striped hover responsive :items="tableDataStandings.items" :fields="tableDataStandings.fields">
         <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
         </template>   
        </b-table>
        <b-spinner class="text-center" v-if="widgetData.tableLoadingSpinner" variant="success" label="Spinningg" ></b-spinner>
    </div>    
</template>
<script>
export default{
    name: 'generalStandings',
    data(){
        return{
            widgetData : {
                tableLoadingSpinner : false
            },
            tableDataStandings:{
                items: tableItems,
                fields: tableFields
            }
        }
    },
    mounted(){
        this.widgetData.tableLoadingSpinner = true;
         this.$emit("standingsReady", false);
         const jwt = localStorage.getItem("jwt");
         const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token' : jwt
        }};
        this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/standings", options)
        .then( standings =>{
            standings.data.response.sort( function(a,b){ return b.points - a.points } );
            for(let i =0; i<standings.data.response.length; i++) {
                let tableItem = {
                    "giocatore": standings.data.response[i].utente.username.toUpperCase(),
                    "punti": standings.data.response[i].points,
                    }
                tableItems.push(tableItem);
                }
                this.$emit("standingsReady", true);
                this.widgetData.tableLoadingSpinner = false;
            })
        .catch( e =>{
            this.$emit("dbError", e);
        });
            
    },
     beforeDestroy(){
        this.tableDataStandings.items = null;
        tableItems = [];
        }
    }
let tableItems = [];
let tableFields = [
     {
      key: 'index',
      sortable: false,
      label: '#'
    },
     {
      key: 'giocatore',
      sortable: false,
      label: 'Giocatore'
    },
    {
      key: 'punti',
      sortable: false,
      label: 'Punti',
      sortDirection: 'desc' //non funziona sta roba
    }
  ];
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
#generalStandings{
  width:60%;
  margin: 30px auto;
  background: transparent;
  padding:10px 0 0 0;

}
</style>