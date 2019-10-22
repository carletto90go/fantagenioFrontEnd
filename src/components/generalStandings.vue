<template>
    <div id="generalStandings">
        <b-table  striped hover responsive :items="tableDataStandings.items" :fields="tableDataStandings.fields">
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
            for(let i =0; i<standings.data.response.length; i++) {
                let tableItem = {
                    "giocatore": standings.data.response[i].utente.username.toUpperCase(),
                    "punti": standings.data.response[i].points,
                }
                tableItems.push(tableItem);
                }
                this.$emit("standingsReady", true);
            })
        .catch(e=>{
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