<template>
     <div>
     <!-- <input type="text" v-model="output.inputBet" @change="change"> -->
     <b-form-select v-model="output.inputBet"  @change="change" :options="output.optionsBet1x2" size="sm" class="mt-3"></b-form-select>
     </div>
</template>

<script>
export default {
    data(){
        return {
            output: {
                index: 0,
                inputBet: null,
                 optionsBet1x2: [
                { value: null, text: 'Inserire risultato esatto' },
                { value: 1, text: '1' },
                { value: 2, text: '2' },
                { value: 0, text: 'X' }
                 ],
            }
        }
    },
    props:{
        parentIndex: {
            type: Number,
            default(){
                return 3
                }
        }
    },
    beforeMount(){
        this.output.index = this.parentIndex;
    },
    methods:{
        change(){
            this.$emit("listenerInput1x2", this.output);
        }
    }
}
</script>