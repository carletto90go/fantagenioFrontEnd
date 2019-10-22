<template>
     <div>
     <!-- <input type="text" v-model="output.inputBet" @change="change"> -->
     <b-form-select v-if="!output.alreadyStarted" v-model="output.inputBet"  @change="change" :options="output.optionsCorrectResult" size="sm" class="mt-3"></b-form-select>
     <b-form-select disabled v-if="output.alreadyStarted" v-model="output.inputBet"  @change="change" :options="output.optionsCorrectResult" size="sm" class="mt-3"></b-form-select>
     </div>
</template>

<script>
export default {
    data(){
        return {
            output: {
                alreadyStarted: false,
                index: 0,
                inputBet: null,
                 optionsCorrectResult: [
                { value: null, text: 'Inserire risultato' },
                { value: [0,0], text: '0-0' },
                { value: [1,0], text: '1-0' },
                { value: [1,1], text: '1-1' },
                { value: [0,1], text: '0-1' },
                { value: [2,1], text: '2-1' },
                { value: [2,0], text: '2-0' },
                { value: [1,2], text: '1-2' },
                { value: [0,2], text: '0-2' },
                { value: [3,0], text: '3-0' },
                { value: [0,3], text: '0-3' },
                { value: [1,3], text: '1-3' },
                { value: [4,1], text: '4-1' },
                { value: [3,1], text: '3-1' },
                { value: [5,1], text: '5-1' },
                { value: [4,0], text: '4-0' },
                { value: [2,2], text: '2-2' },
                { value: [3,3], text: '3-3' },
                { value: [3,2], text: '3-2' },
                { value: [2,3], text: '2-3' },
                { value: [0,4], text: '0-4' },
                { value: [3,1], text: '1-4' },
                { value: [1,5], text: '1-5' },
                { value: [5,0], text: '5-0' },
                { value: [0,5], text: '0-5' },
                 ],
            }
        }
    },
    props:{
        parentIndex: {
            type: Number,
        },
        parentMatch: {
            type: Object
        }
    },
    beforeMount(){
        this.output.index = this.parentIndex;
        this.output.alreadyStarted = this.parentMatch.started;
        this.output.inputBet = this.parentMatch.prediction;
    },
    methods:{
        change(){
            this.$emit("listenerInputCorrectResult", this.output);
        }
    }
}
</script>