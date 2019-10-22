<template>
     <div>
     <!-- <input type="text" v-model="output.inputBet" @change="change"> -->
     <b-form-select v-if="!output.alreadyStarted" v-model="output.inputBet"  @change="change" :options="output.optionsBet1x2" size="sm" class="mt-3" ></b-form-select>
     <b-form-select disabled v-if="output.alreadyStarted" v-model="output.inputBet"  @change="change" :options="output.optionsBet1x2" size="sm" class="mt-3"></b-form-select>
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
                 optionsBet1x2: [
                { value: null, text: 'Inserire risultato esatto' },
                { value: 1, text: '1' },
                { value: 2, text: '2' },
                { value: 3, text: 'X' }
                 ],
            }
        }
    },
    props:{
        parentIndex: {
            type: Number
        },
        parentMatch: {
            type: Object
        }
    },
    beforeMount(){
        this.output.index = this.parentIndex;
        this.output.alreadyStarted = this.parentMatch.started;
        this.output.inputBet = this.parentMatch.prediction;
        if(this.output.inputBet == "X") this.output.inputBet = 3;
    },
    methods:{
        change(){
            this.$emit("listenerInput1x2", this.output);
        }
    }
}
</script>