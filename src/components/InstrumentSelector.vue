<template>

  <v-card outlined class="pa-2 d-flex flex-column">
    <v-card-text class="caption">Setting instrument {{id+1}}</v-card-text>
    <div>
      <SynthSelector :selectedSynth="selectedSynthNumber"
        :id="id"
        @instrumentSelectorEvent="changeSynth">
      </SynthSelector>
    </div>
    <div class="mt-3">
      <v-slider
        v-model="volumeSlider.val"
        :color="volumeSlider.color"
        min="-40" max="3" step="5"
        :thumb-label="true"
        prepend-icon="mdi-volume-high"
      ></v-slider>
    </div>

    <div class="mt-3">
      <v-slider v-if="id!=2"
        v-model="durationSlider.val"
        :color="durationSlider.color"
        min="0" max="4" step="0.1"
        :thumb-label="true"
        prepend-icon="mdi-sine-wave"
      ></v-slider>
    </div>
    <v-btn block @click="instrumentSelection">
      select
    </v-btn>
  </v-card>
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
    },

    data(){
      return {
        selectedSynthNumber: this.$store.state.synth_selection[this.id],
        volumeSlider: { label: 'volume', val: -0, color: 'orange darken-3' },
        durationSlider: { label: 'duration', val: 2, color: 'green lighten-1' },
      }
    },

    methods: {
      changeVolume(){
        if(this.id==0 || this.id==1) { 
            this.myInstrument.volume.value = this.volumeSlider.val;
        }
        if(this.id==2) { 
            for(let i=0;i<8;i++){
            this.myInstrument[i].volume.value = this.volumeSlider.val;
            }
        }
      },
      instrumentSelection(){
        this.$emit('instSelectionEvent',this.id)
      },

      changeSynth(synth_number){
        console.log(synth_number)
        this.selectedSynthNumber = synth_number
        this.$store.state.synth_selection[this.id] = synth_number
        this.$emit('changeSynthEvent',this.id)
        this.$store.commit('synthsChanged')
        this.changeVolume()
      }
    },

    computed: {
        
        myInstrument() {
          // return this.$store.state.instruments[this.id]}
          if(this.id==0) { return this.$store.state.synth1 }
          if(this.id==1) { return this.$store.state.synth2 }
          if(this.id==2) { return this.$store.state.drum }
        }
    },
    
    watch: {
        'volumeSlider.val': function() {
          this.changeVolume()
        },
        'durationSlider.val': function() {
          console.log(this.durationSlider.val)
          this.$emit('durationChangeEvent', this.id, this.durationSlider.val)
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