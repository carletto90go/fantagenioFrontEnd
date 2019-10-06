<template>
    <div id="bet">
        
        <h1>Giornata Numero {{numeroGiornata}}</h1>
        <div>
              <b-table striped hover :items="items" :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'bet',
        data() {
            return {
                  fields: [
          {
            key: 'homeTeam',
            sortable: false
          },
          {
            key: 'awayTeam',
            sortable: false
          },
          {
            key: 'homeResult',
            label: 'Risultato Casa'
          },
          {
            key: 'awayResult',
            label: 'Risultato Ospite'
          },
          {
            key: 'result',
            label: 'Risultato 1X2'
          }
        ],
        items: [
          { homeTeam: 'inter', awayTeam: 'Rubentus', homeResult: '',awayResult:'',result:''  },
        ]
            };
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