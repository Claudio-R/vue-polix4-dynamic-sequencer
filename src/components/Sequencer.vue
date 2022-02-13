<template>
  <v-card id="sequencer" min-width="370px">
    <v-app-bar prominent elevate-on-scroll fixed class="primary">
    <v-container fluid id="container-bar" class="primary py-4 px-0">
    <!-- <v-container fluid id="container-bar" class="py-4 px-0" :min-height="heightHorizontal"> -->

      <!--**FIRST ROW** -->
      <v-row dense>

       <!-- SELECT BPM -->
        <v-col cols="4" class="caption">
          <v-menu :close-on-content-click="false"
            offset-y
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn depressed small block v-on="on">
                <v-icon left class="hidden-xs-only">mdi-metronome-tick</v-icon>
                <span>BPM: {{bpm}}</span>
              </v-btn>
            </template>
            <v-card class="mx-auto" min-width="250">
  
              <v-card-text>
                <v-row
                  class="mb-2"
                  justify="space-between"
                >
                  <v-col class="text-left">
                    <span
                      class="text-h2 font-weight-light"
                      v-text="bpm"
                    ></span>
                    <span class="subheading font-weight-light mr-1">BPM</span>
                  </v-col>
                </v-row>

                <v-slider v-model="bpm" color="primary" track-color="grey"
                  always-dirty min="40" max="218">
                  <template v-slot:prepend>
                    <v-icon color="secondary" @click="bpm--">
                      mdi-minus
                    </v-icon>
                  </template>

                  <template v-slot:append>
                    <v-icon color="secondary" @click="bpm++">
                      mdi-plus
                    </v-icon>
                  </template>
                </v-slider>

              </v-card-text>
            </v-card>
          </v-menu>
        </v-col>
        
        <!-- INSTRUMENT SELECTOR -->
        <v-col cols="4" class="caption">
          <v-menu :close-on-content-click="false" max-width="90%" max-height="90%"
            offset-y
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn small depressed :class="`${inst_color[inst_id]}--text`" block v-on="on">
                <v-icon left class="hidden-xs-only">mdi-guitar-electric</v-icon>
                <span class="caption text-truncate hidden-sm-and-up" style="max-width: 50px;">{{inst_names[inst_id]}}</span>
                <span class="caption hidden-xs-only">{{inst_names[inst_id]}}</span>
              </v-btn>
            </template>
            <v-card flat class="pa-4" style="position: relative;">
              <v-row>
                <v-col cols="12" sm="4" v-for="(instrument_name, index) in inst_names" :key="`sequencer-${index}-${instrument_name}`">
                  <InstrumentSelector
                    :id="index"
                    @instSelectionEvent="instSelected"
                    @durationChangeEvent="changeDuration"
                    @changeSynthEvent="changeSynthName"
                  ></InstrumentSelector>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
        </v-col>

        <!-- ADD BARS -->
        <v-col cols="4" class="caption">
          <v-menu :close-on-content-click="false"
            offset-y
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn small depressed block v-on="on">
                <span >Bars: {{n_bars}}</span>
              </v-btn>
            </template>
            <v-card flat dense class="d-flex justify-space-around pa-6">
              <v-btn icon large @click="() => {if(n_bars<4){n_bars++; addBar()}}">
                <v-icon color="primary" >mdi-plus</v-icon>
              </v-btn>
              <v-btn icon large @click="() => {if(n_bars>1){n_bars--}}">
                <v-icon color="primary" >mdi-minus</v-icon>
              </v-btn>
            </v-card>
          </v-menu>
        </v-col>    
      
      </v-row>
      <!--**/FIRST ROW** -->

      <!--**SECOND ROW** -->
      <v-row dense class="d-flex align-center">

        <!-- ADD LAYER -->
        <v-col cols="2" md="3" class="hidden-xs-only">
          <v-card flat>
            <v-card-actions>
              <v-text-field type="number" v-model.number="numBeatsNewLayer"
                label="Add a layer"
                outlined dense
                hint="Value from 1 to 12"
                hide-details="true"
                append-outer-icon="mdi-plus-circle"
                @click:append-outer="addLayer"
              ></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- BUTTONS -->
        <v-col cols="10" sm="8" md="6">
          <v-card flat class="d-flex justify-center" min-height="56px">
            <v-row no-gutters class="d-flex align-center">
              <!-- BUTTONS -->
              <v-col cols="12" sm="8">
                <v-card-actions class="d-flex justify-space-around">
                  <v-btn icon small @click="playAll">
                    <v-icon large>mdi-play</v-icon>
                  </v-btn>
                  <v-btn icon small @click="stopAll">
                    <v-icon large>mdi-stop</v-icon>  
                  </v-btn>
                  <v-btn icon small :disabled="!unifiedControl" @click="toggleMuteSystem">
                    <v-icon large >mdi-volume-mute</v-icon>
                  </v-btn>

                  <v-btn small depressed color="primary" @click="clearAll">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn small depressed :class="{primary : automaticSlideControl}" @click="automaticSlideControl=!automaticSlideControl">
                    <v-icon>mdi-arrow-right-circle-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
              <!-- MERGE/UNMERGE BUTTON -->
              <v-col sm="4" class="hidden-xs-only">
                <v-card-actions>
                  <v-btn v-if="unifiedControl" small depressed block 
                  @click="unifiedControl=!unifiedControl"
                  >Unmerge</v-btn>
                  <v-btn v-else small depressed block 
                  @click="unifiedControl=!unifiedControl"
                  >Merge</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- MENU -->
        <v-col cols="2" md="3">
          <v-menu :disabled="!unifiedControl && !$vuetify.breakpoint.xs" :close-on-content-click="false" max-width="100%"
            offset-y offset-x
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn block small depressed :disabled="!unifiedControl && !$vuetify.breakpoint.xs" v-on="on" min-height="56px">
                <v-icon>mdi-menu</v-icon>
                <span class="hidden-sm-and-down">Main controller</span>
              </v-btn>
            </template>
            <v-expansion-panels accordion>
              <!-- OCTAVE -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Octave: {{allLayersOctave}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-card outlined class="pa-4 d-flex justify-space-around">
                    <v-btn icon @click="moreOctave">
                      <v-icon color="primary">mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon @click="lessOctave">
                        <v-icon color="primary">mdi-minus</v-icon>
                    </v-btn>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- KEY -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Selected key: {{allLayersKey}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <KeySelector @keySelectedEvent="changeKey"
                    :selectedKey="allLayersKey"
                  ></KeySelector>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- SCALE -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Selected scale: {{allLayersScale}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ScaleSelector @scaleSelectedEvent="changeScale"
                  :selectedScale="allLayersScale"
                ></ScaleSelector>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-menu>
        </v-col>

      </v-row>
      <!--**/SECOND ROW** -->

    </v-container> 
    </v-app-bar>

    <v-card id="layers-container" flat tile class="d-flex flex-column">
        <Layer v-for="(layer,index) in layers"
          ref="layers_refs"
          :key="`layer-${layer.id}`"
          :layerId="`layer-${layer.id}`"
          :unifiedControl="unifiedControl"
          :systemPlaying="systemPlaying"
          :n_bars="n_bars"
          :inst_id="inst_id"
          :duration="duration"
          :total_duration="total_duration"
          :num_beats="layer.num_beats"
          :octaveLayer="layer.octaveLayer"
          :keyLayer="layer.keyLayer"
          :scaleLayer="layer.scaleLayer"
          :muteLayer="layer.muteLayer"
          :automaticSlideControl="automaticSlideControl"
          @restartEvent="restart(index)"
          @removeLayerEvent="layers.splice(index,1)"
          @addKeyEvent="() => {if(!systemPlaying && layer.num_beats < 12 ) layer.num_beats++}"
          @removeKeyEvent="() => {if(!systemPlaying && layer.num_beats > 1 ) layer.num_beats--}"
          @keySelectedEvent="(val) => {layer.keyLayer = val}"
          @scaleSelectedEvent="(val) => {layer.scaleLayer = val}"
          @moreOctaveEvent="() => {if(layer.octaveLayer < 6) layer.octaveLayer++}"
          @lessOctaveEvent="() => {if(layer.octaveLayer > 2) layer.octaveLayer--}"
          @togglePrelistenLayerEvent="layer.prelistenLayer = !layer.prelistenLayer"
          @toggleMuteLayerEvent="layer.muteLayer = !layer.muteLayer"
        ></Layer>
    </v-card>

  </v-card>
</template>

<script>

import Layer from '@/components/Layer.vue'
import ScaleSelector from '@/components/ScaleSelector.vue'
import KeySelector from '@/components/KeySelector.vue'
import InstrumentSelector from '@/components/InstrumentSelector'
import SynthSelector from '@/components/SynthSelector'

export default {
  name: 'Sequencer',

  components: {
      Layer,
      ScaleSelector, 
      KeySelector,
      InstrumentSelector,
      SynthSelector
  },

  data(){
    return {
      inst_color: ['red','blue','teal'],
      /** sequencer controller */
      systemPlaying: false,
      bpm: 120,
      numBeatsNewLayer: '',
      unifiedControl: true,
      n_bars:1,
      inst_id: 0,
      duration:["16n","16n"],
      automaticSlideControl: true,
      
      /** unified controller */
      allLayersOctave: 4,
      allLayersKey: 'C',
      allLayersScale: 'Major',
      prelistenSystem: true,
      muteSystem: false,
      inst_names: [this.$store.state.synth_names[this.$store.state.synth_selection[0]],this.$store.state.synth_names[this.$store.state.synth_selection[1]],this.$store.state.drum_names[this.$store.state.synth_selection[2]]],
        
      /** state variables */
      nextId: 2,
      layers: [
        {
          id: 0,
          num_beats: 3,
          octaveLayer: 4,
          keyLayer: 'C',
          scaleLayer: 'Major',
          prelistenLayer: true,
          muteLayer: false,
        },
        {
          id: 1,
          num_beats: 5,
          octaveLayer: 4,
          keyLayer: 'C',
          scaleLayer: 'Major',
          prelistenLayer: true,
          muteLayer: false,
        },
      ], 
    }
  },

  computed: {
    total_duration() {
      if(this.layers[0]){
        return this.layers[0].num_beats*60000/this.bpm;
      }
    },
    // heightHorizontal () {
    //     switch (this.$vuetify.breakpoint.name) {
    //       case 'xs': return '27%'
    //       case 'sm': return '27%'
    //       case 'md': return '20%'
    //       case 'lg': return '18%'
    //       case 'xl': return '18%'
    //     }
    //   },
  },

  methods: {
      addLayer() {
          // console.log(this.numBeatsNewLayer)
          if(this.numBeatsNewLayer > 12) this.numBeatsNewLayer = 12;
          this.layers.push(
              {   
                  id: this.nextId,
                  num_beats: this.numBeatsNewLayer,
                  octaveLayer: this.allLayersOctave,
                  keyLayer: this.allLayersKey,
                  scaleLayer: this.allLayersScale,
                  prelistenLayer: this.prelistenSystem,
                  muteLayer: this.muteSystem,
              }
          )
          this.nextId += 1;
      },
      addBar(){
          for(let idx in this.layers) {
              // console.log(this.$refs.layers_refs.length, idx);
              // console.log(this.$refs.layers_refs[idx]);
              this.$refs.layers_refs[idx].addLBar()
          }
      },
      instSelected(inst_id) {
          this.inst_id=inst_id
          console.log(inst_id)
      },
      changeDuration(inst_id,duration){
          this.duration[inst_id]=20-duration*4+"n"
      },
      playAll() {
          this.systemPlaying = true;
          for(let idx in this.layers) {
              this.$refs.layers_refs[idx].isPlaying = 0
          }
          for(let idx in this.layers) {
              this.$refs.layers_refs[idx].play()
          }
      },
      stopAll() {
          this.systemPlaying = false
          for(let idx in this.layers) {
              this.$refs.layers_refs[idx].stop()
          }
      },
      restart(index) {
          if(index==0){
              console.log("Restart")
              this.playAll();
          }
      },

      /** unified controller */
      changeKey(num_key){
          this.allLayersKey = num_key;
          for(let idx in this.layers) {
              this.layers[idx].keyLayer = this.allLayersKey;
          }
      },
      changeScale(num_scale){
          this.allLayersScale = num_scale;
          for(let idx in this.layers) {
              this.layers[idx].scaleLayer = this.allLayersScale;
          }
      },
      changeSynthName(id){
        if(id!=2)
            this.inst_names[id] = this.$store.state.synth_names[this.$store.state.synth_selection[id]]
        else
            this.inst_names[id] = this.$store.state.drum_names[this.$store.state.synth_selection[id]]
        if(id==this.inst_id)
        this.$forceUpdate();
      },
      moreOctave(){
          if(this.allLayersOctave < 6){ 
              this.allLayersOctave++;
              for(let idx in this.layers) {
                  this.layers[idx].octaveLayer = this.allLayersOctave;
              }
          }
      },
      lessOctave(){
          if(this.allLayersOctave > 2){
              this.allLayersOctave--;
              for(let idx in this.layers) {
                  this.layers[idx].octaveLayer = this.allLayersOctave;
                  //this.$refs.layers_refs[idx].lessOctave()
              }
          }
      },
      togglePrelistenSystem() { 
          this.prelistenSystem = !this.prelistenSystem;
          for(let idx in this.layers) { 
              this.layers[idx].prelistenLayer = this.prelistenSystem; 
          }
      },
      toggleMuteSystem() { 
          this.muteSystem = !this.muteSystem;
          for(let idx in this.layers) { 
              this.layers[idx].muteLayer = this.muteSystem; 
          }
      },
      clearAll() {
          for(let idx in this.layers) {
              this.$refs.layers_refs[idx].clearLayer();
          }
      },
  },
}

</script>

<style lang="scss">

#container-bar {
  position: sticky;
  opacity: 0.88;
  backdrop-filter: blur(1px);
  top: 0;
  z-index: 1;
}

// #view-box {
//     display: inline-flex;
//     border-radius: 10px;
//     margin-top: 10px;
//     margin-left: 10px;
//     padding: 10px;
//     background-color: beige;
// }

// .viewer{
//     width: auto;
//     height: 80%;
//     margin-right: 10px;
//     border: 2px solid rgb(216, 216, 178);
//     background-color: bisque;
// }

// .unified {
//     margin: 10px;
//     padding: 5px;
//     background-color: #e2c957;
//     border: rgb(177, 161, 15) solid 3px;
//     border-radius: 10px;
// }

#layers-container {
    margin-top: 128px;
    background: transparent;
}

</style>