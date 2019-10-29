<template>
    <div id="generalStandings" class="text-center">
        <b-table class="Standings" head-variant="light" v-if="!widgetData.tableLoadingSpinner" id="table"  small dark striped hover responsive :items="tableDataStandings.items" :fields="tableDataStandings.fields">
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
        this.axios.get("https://hidden-ocean-91661-stage.herokuapp.com/api/user/standings", options)
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
      label: 'Posizione'
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
    }
  ];
</script>
<style scoped>
.Standings{
    box-shadow: 0 14px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>