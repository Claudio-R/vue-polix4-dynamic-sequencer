<template>
  <div id="sequencer">

    <v-card flat tile id="container-bar" class="primary pa-2" ref="container_ref" height="27vh">
      <v-row dense>
       <!-- SELECT BPM -->
        <v-col cols="4" class="caption">
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn small block v-on="on">
                <v-icon left class="hidden-xs-only">mdi-metronome-tick</v-icon>
                <span>BPM: {{bpm}}</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-slider
                    v-model="bpm"
                    min="1" max="280"
                ></v-slider>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <!-- INSTRUMENT SELECTOR -->
        <v-col cols="4" class="caption">
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn small block v-on="on">
                <v-icon left class="hidden-xs-only">mdi-guitar-electric</v-icon>
                <span>{{inst_names[inst_id-1]}}</span>
              </v-btn>
            </template>
            <v-row>
              <v-col cols="4" v-for="(instrument_name, index) in inst_names" :key="instrument_name">
                <v-card>
                  <InstrumentSelector
                    :id="index+1"
                    :selected_inst="inst_id"
                    @instSelectionEvent="instSelected"
                    @durationChangeEvent="changeDuration"
                  ></InstrumentSelector>
                </v-card>
              </v-col>
            </v-row>
          </v-menu>
        </v-col>
        <!-- ADD BARS -->
        <v-col cols="4" class="caption">
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn small block v-on="on">
                <span >Bars: {{n_bars}}</span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="() => {if(n_bars<4){n_bars++; addBar()}}">
                <v-icon left>mdi-plus</v-icon>
                <v-list-item-title class="">Add a new bar</v-list-item-title> 
              </v-list-item>
              <v-list-item @click="() => {if(n_bars>1){n_bars--}}">
                <v-icon left>mdi-minus</v-icon>
                <v-list-item-title class="">Add a new bar</v-list-item-title> 
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>    
      </v-row>

      <v-row dense class="d-flex align-center">
        <!-- ADD LAYER -->
        <v-col cols="6" sm="3">
          <v-card>
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

        <!-- MAIN CONTROLLER -->
        <v-col cols="6">
          <v-card flat>
            <!-- FIRST ROW -->
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-card-actions class="d-flex justify-space-around">
                  <v-btn small class="" depressed @click="playAll">
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                  <v-btn small class="" depressed @click="stopAll">
                    <v-icon>mdi-stop</v-icon>  
                  </v-btn>
                  <v-btn small class="" depressed>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
              <!-- UNMERGE BUTTON ON SM -->
              <v-col sm="6" class="hidden-xs-only">
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
            <!-- SECOND ROW ON XS ONLY -->
            <v-row class="hidden-sm-and-up" no-gutters>
              <v-col cols="12" sm="6">
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

        <v-col sm="3" class="hidden-xs-only">
          <!-- dare classe disabled -->
          <v-menu offset-y :disabled="!unifiedControl" :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn block v-on="on">
                <v-icon left class="hidden-xs-only">mdi-menu</v-icon>
                <span>Main controller</span>
              </v-btn>
            </template>
            <v-expansion-panels multiple accordion>
              <!-- OCTAVE -->
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Octave: {{allLayersOctave}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn small @click="moreOctave">
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn small @click="lessOctave">
                      <v-icon small>mdi-minus</v-icon>
                  </v-btn>
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
    </v-card> 
    
    <v-card id="layers-container" flat tile class="d-flex flex-column">
      <v-carousel :vertical="true"
      height="73vh"
      :show-arrows="false"
      :vertical-delimiters="'left'">
        <Layer v-for="(layer,index) in layers"
          ref="layers_refs"
          :key="`layer-${layer.id}`"
          :layerId="`layer-${layer.id}`"
          :unifiedControl="unifiedControl"
          :n_bars="n_bars"
          :inst_id="inst_id"
          :duration="duration"
          :total_duration="total_duration"
          :num_beats="layer.num_beats"
          :octaveLayer="layer.octaveLayer"
          :keyLayer="layer.keyLayer"
          :scaleLayer="layer.scaleLayer"
          :prelistenLayer="layer.prelistenLayer"
          :muteLayer="layer.muteLayer"
          :singleLayerHeight="window_height - container_height - 24"
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
      </v-carousel>
    </v-card>

  </div>
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
        window_height: Number,
        container_height: Number,
        /** sequencer controller */
        systemPlaying: false,
        bpm: 120,
        numBeatsNewLayer: '',
        unifiedControl: true,
        n_bars:1,
        inst_id: 1,
        duration:["16n","16n"],
        
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
          num_beats: 6,
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
  },

  mounted() {
    this.container_height = this.$refs.container_ref.offsetHeight;
    this.window_height = window.screen.height;
  },

  methods: {
      /** sequencer controller */
      // addLayer(num_beats_input) {
      addLayer() {
          console.log(this.numBeatsNewLayer)
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
      // updateBPM(bpm_input) {
      //     this.bpm = bpm_input
      // },
      addBar(){
          for(let idx in this.layers) {
              console.log(this.$refs.layers_refs.length, idx);
              console.log(this.$refs.layers_refs[idx]);
              this.$refs.layers_refs[idx].addLBar()
          }
      },
      instSelected(inst_id) {
          this.inst_id=inst_id
      },
      changeDuration(inst_id,duration){
          this.duration[inst_id-1]=20-duration*4+"n"
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
        if(id+1==this.inst_id)
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
      clearSystem() {
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
  top: 0;
  z-index: 10;
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
    // margin: 10px;
    background-color: rgb(28, 140, 148);
}

</style>