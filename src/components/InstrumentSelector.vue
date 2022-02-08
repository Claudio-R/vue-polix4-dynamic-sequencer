<template>
  <div>
    <SynthSelector :selectedSynth="selectedSynthNumber"
      :id="id"
      @instrumentSelectorEvent="changeSynth">
    </SynthSelector>
    <v-slider
      v-model="volumeSlider.val"
      :color="volumeSlider.color"
      :label="volumeSlider.label"
      min="-40" max="3" step="5"
    ></v-slider>
    <v-slider v-if="id!=3"
      v-model="durationSlider.val"
      :color="durationSlider.color"
      :label="durationSlider.label"
      min="0" max="4" step="1"
    ></v-slider>
    <v-btn @click="instrumentSelection">
      select
    </v-btn>
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

    data(){
      return {
        selectedSynthNumber: this.$store.state.synth_selection[this.id-1],
        volumeSlider: { label: 'volume', val: -0, color: 'orange darken-3' },
        durationSlider: { label: 'duration', val: 2, color: 'green lighten-1' },
      }
    },

    methods: {
      changeVolume(){
        if(this.id==0 || this.id==1) { 
            this.myInstrument.volume.value = this.volume;
        }
        if(this.id==2) { 
            for(let i=0;i<8;i++){
            this.myInstrument[i].volume.value = this.volume;
            }
        }
      },
      instrumentSelection(){
        this.$emit('instSelectionEvent',this.id+1)
      }

      // changeSynth(synth_number){
      //     this.selectedSynthNumber = synth_number
      //     this.$store.state.synth_selection[this.id-1] = synth_number
      //     this.$emit('changeSynthEvent',this.id-1)
      //     this.$store.commit('synthsChanged')
      //     this.changeVolume()
      // }
    },

    computed: {
        
        myInstrument() {
          // return this.$store.state.instruments[this.id]}
          if(id==0) { return this.$store.state.synth1 }
          if(id==1) { return this.$store.state.synth2 }
          if(id==2) { return this.$store.state.drum }
        }
    },
    
    watch: {
        'volume': function() {
            this.changeVolume()
        },
        'duration': function() {
            this.$emit('durationChangeEvent', this.id, this.duration)
        },
    }
}
</script>

<style lang="scss">
// .inst_sel {
//     /* location */
//     position: relative;
//     top: 6px;
//     /* aspect */
//     width: calc(18px - 2 * var(--inst_sel_border));
//     height: calc(18px - 2 * var(--inst_sel_border));
//     background-color: var(--inst_sel_color);
//     padding: none;
//     border: var(--inst_sel_border) solid #0000004d;
//     border-radius: 100%;
//     margin: 5px;

// }

// .inst-menu {
//     margin-top:0px;
//     width: 200px;
//     position:absolute;
//     z-index: 9;
//     background-color: rgb(107, 216, 183);
//     left: -86px;
// }
</style>