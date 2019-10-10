<template>
     <div>
     <!-- <input type="text" v-model="output.inputBet" @change="change"> -->
     <b-form-select v-model="output.inputBet"  @change="change" :options="output.optionsCorrectResult" size="sm" class="mt-3"></b-form-select>
     </div>
</template>

<script>
export default {
    data(){
        return {
            output: {
                index: 0,
                inputBet: null,
                 optionsCorrectResult: [
                { value: null, text: 'Inserire risultato' },
                { value: [0,0], text: '0-0' },
                { value: [1,0], text: '1-0' },
                { value: [1,1], text: '1-1' },
                { value: [2,2], text: '2-2' },
                { value: [2,1], text: '2-1' },
                { value: [2,0], text: '2-0' },
                { value: [1,2], text: '1-2' },
                { value: [0,2], text: '0-2' },
                { value: [3,0], text: '3-0' },
                { value: [0,3], text: '0-3' },
                { value: [1,3], text: '1-3' },
                { value: [3,1], text: '3-1' },
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
            this.$emit("listenerInputCorrectResult", this.output);
        }
    }
}
</script>