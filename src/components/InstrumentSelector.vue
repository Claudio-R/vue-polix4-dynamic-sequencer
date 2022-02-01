<template>
    <div class="inst-container">
        <div class="inst_sel"
            @click="instSelection"
            @mouseover="menu=true"
            @mouseleave="menu=false"
            :style="cssVars">
        </div>
        <div class="inst-menu"
            @mouseover="menu=true"
            @mouseleave="menu=false"
            v-show="menu">
            <label>Volume:</label>
            <input type="range" min="-40" max="3" v-model="volume">
            <div v-if="id!=3">
                <label>Duration:</label>
                <input type="range" min="0" max="4" v-model="duration">
            </div>
            <SynthSelector :selectedSynth="selectedSynthNumber"
                    :id="id"
                    @instrumentSelectorEvent="changeSynth">
            </SynthSelector>
        </div>
    </div>
</template>

<script>
import SynthSelector from './SynthSelector.vue'

export default {
    name: 'InstrumentSelector',

    components: {
        SynthSelector
    },

    props:{
        id: { type: Number, },
        selected_inst:{ type: Number, },
    },

    data() {
        return {
            menu: false,
            volume: 1,
            duration: 1,
            selectedSynthNumber: this.$store.state.synth_selection[this.id-1]
        }
    },

    methods: {
        instSelection() {
           this.state = true
           this.$emit('instSelectionEvent', this.id)
       },
       changeVolume(){
           if(this.id==1) { 
                this.synth1.volume.value = this.volume;
            } 
            if(this.id==2) { 
                this.synth2.volume.value = this.volume;
            }
            if(this.id==3) { 
                for(let i=0;i<8;i++){
                this.drum[i].volume.value = this.volume;
                }
            }
       },
       changeSynth(synth_number){
            this.selectedSynthNumber = synth_number
            this.$store.state.synth_selection[this.id-1] = synth_number
            this.$emit('changeSynthEvent',this.id-1)
            this.$store.commit('synthsChanged')
            this.changeVolume()
        }
    },

    computed: {
        synth1() {
        return this.$store.state.synth1
        },
        synth2() {
            return this.$store.state.synth2
        },
        drum() {
            return this.$store.state.drum
        },
        cssVars() {
            let activeCSScolors = ['rgb(255, 0, 0)','rgb(0, 0, 255)','rgb(0, 255, 0)'];
            let passiveCSScolors = ['rgb(120, 0, 0)','rgb(0, 0, 120)','rgb(0, 120, 0)'];
            if(this.id==this.selected_inst){
            return{
                '--inst_sel_color': activeCSScolors[this.id-1],
                '--inst_sel_border': '0px'
            }}
            return{
                '--inst_sel_color': passiveCSScolors[this.id-1],
                '--inst_sel_border': '2px'
            }
        },
    },

    watch: {
        'volume': function() {
            this.changeVolume()
        },
        'duration': function() {
            this.$emit('durationChangeEvent', this.id, this.duration)
        }
    },
}
</script>

<style lang="scss">
.inst_sel {
    /* location */
    position: relative;
    top: 6px;
    /* aspect */
    width: calc(18px - 2 * var(--inst_sel_border));
    height: calc(18px - 2 * var(--inst_sel_border));
    background-color: var(--inst_sel_color);
    padding: none;
    border: var(--inst_sel_border) solid #0000004d;
    border-radius: 100%;
    margin: 5px;

}

.inst-menu {
    margin-top:0px;
    width: 200px;
    position:absolute;
    z-index: 9;
    background-color: rgb(107, 216, 183);
    left: -86px;
}
</style>