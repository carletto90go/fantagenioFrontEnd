<template>
    <div id="generalStandings">
        <b-table>
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
         const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        }};
        this.axios.get("https://hidden-ocean-91661.herokuapp.com/api/user/standings", options)
        .then(
            for (let i =0; i<10; i++) {
                    let tableItem = {
                        "giocatore": response[i].username,
                        "punti": response[i].points,
                    }
        )
}
</script>