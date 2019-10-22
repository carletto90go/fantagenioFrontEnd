<template>
    <div id="generalStandings">
        <b-table id="table" striped hover responsive :items="tableDataStandings.items" :fields="tableDataStandings.fields">
         <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
         </template>   
        </b-table>
    </div>    
</template>
<script>
export default{
    name: 'generalStandings',
    data(){
        return{
            tableDataStandings:{
                items: tableItems,
                fields: tableFields
            }
        }
    },
    mounted(){
         const jwt = localStorage.getItem("jwt");
         const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'auth-token' : jwt
        }};
        this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/standings", options)
        .then( standings =>{
            // eslint-disable-next-line
            console.log(standings);
            for(let i =0; i<standings.data.response.length; i++) {
                let tableItem = {
                    "giocatore": standings.data.response[i].utente.username.toUpperCase(),
                    "punti": standings.data.response[i].points,
                }
                tableItems.push(tableItem);
                }
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
      sortDirection: 'desc'
    }
  ];
</script>
<style scoped>
#generalStandings{
  width:60%;
  margin: 30px auto;
  background:#F1F1F1;
  padding-top:10px;
  padding-left:40px;
  padding-right:40px; 
  
}
</style>