<template>
    <div class="controller">
        <input type="number" v-model="newInput" placeholder="Add a layer (press enter)" @keyup.enter="addLayer">
        <input type="number" v-model="bpm_value" placeholder="Select bpm (press enter)" @keyup.enter="updateBPM">
        <button @click="$emit('playAllEvent')">Play</button>
        <button @click="$emit('stopAllEvent')">Stop</button>
        <button @click="$emit('unifiedControllerEvent')">Unify controller</button>
        <div id="instrumentContainer">
            <label>Instrument:</label>
            <InstrumentSelector 
                v-for="k in num_inst"
                :key="k"
                :id="k"
                :selected_inst=selected_inst
                @instSelectionEvent="instSelection"
                @durationChangeEvent="emitDuration"
                @changeSynthEvent="emitSynth">
            </InstrumentSelector>
        </div>
    </div>
</template>

<script>
import InstrumentSelector from '@/components/InstrumentSelector.vue'
export default {
    name: 'MainController',
    components: {
        InstrumentSelector
    },

    data() {
        return {
            newInput: '',
            bpm_value: '',
            num_inst: 3,
            selected_inst: 1,
        }
    },

    computed: {
        newInput_toNumber() {
            return this.newInput ? parseInt(this.newInput) : null
        },
        bpm_value_toNumber() {
            return this.bpm_value ? parseInt(this.bpm_value) : null
        }
    },

    methods: {
        addLayer() {
            this.$emit('newLayerEvent', this.newInput_toNumber)
            this.newInput = ''
        },
        updateBPM() {
            this.$emit('bpmEvent', this.bpm_value_toNumber)
            this.bpm_value = '' 
        },
        instSelection(inst_id) {
           this.$emit('instSelectionEvent', inst_id)
           this.selected_inst=inst_id
       },
       emitDuration(inst_id,duration){
        this.$emit('durationEvent', inst_id, duration)
       },
       emitSynth(inst_id){
           this.$emit('synthEvent',inst_id)
       }
    }
}
</script>

<style lang="scss">
.controller {
    width: auto;
    background-color: beige;
    border-radius: 10px;
    margin: 10px;
    height: auto;
    padding: 10px;
}

.inst-container{
    display: inline-block;
    position: relative;
}
</style>