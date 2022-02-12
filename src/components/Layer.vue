<template>
  <v-card :min-height="heightHorizontal" flat tile class="backgroundmain my-0">
      <v-row no-gutters>
        <!-- LABELS -->
        <v-col cols="2">
          <v-container>
            <div v-if="inst_id!=2" class="">
              <v-card flat outlined class="secondary text-center hidden-xs-only" 
                v-for="k in tonesInScale" :key="k"
                >{{scale_keyboard[tonesInScale-k].slice(0, -1)}}
              </v-card>
            </div>
            <div v-else class="">
              <v-card outlined flat class="text-center black--text hidden-xs-only" 
                v-for="k in tonesInScale" :key="k"
                >{{drum_keyboard[tonesInScale-k]}}
              </v-card>
            </div>
            <v-btn block depressed v-if="unifiedControl" class="secondary text-center black--text hidden-xs-only" @click="$emit('removeLayerEvent')">Remove</v-btn>
          </v-container>
        </v-col>

        <!-- BEATS -->
        <!-- Unmerged Controller -->
        <v-col v-if="!unifiedControl" cols="12" sm="7">
          <v-carousel hide-delimiters
          height="100%"
          :continuous="false">
            <v-carousel-item v-for="j in n_bars" :key="`keyboard-${layerId}-${j}`" class="spacing-playground pa-3">
              <v-row no-gutters class="justify-space-between">
                <v-col :cols="num_cols" v-for="k in num_beats" :key="`column-${layerId}-${j}-${k}`">
                  <Column 
                    class="column" :style="cssVars"
                    ref = "beats_refs"
                    :class="{playing : k*j-(k-num_beats)*(j-1) === isPlaying + 1}"
                    :beatId="k*j-1-(k-num_beats)*(j-1)"
                    :inst_selected="inst_id"
                    :num_beats="num_beats"
                    :duration="duration"
                    :prelistenBeat="prelistenLayer"
                    :muteLayer="muteLayer"
                    :isPlaying="isPlaying"
                    :tonesInScale="tonesInScale"
                    :scale_keyboard="scale_keyboard"
                  ></Column>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <!-- Merged Controller -->
        <v-col v-else cols="12" sm="10">
          <v-carousel hide-delimiters
          height="100%"
          :continuous="false"
          v-model="model">
              <v-carousel-item v-for="j in n_bars" :key="`keyboard-${layerId}-${j}`" class="spacing-playground pa-3">
                <v-row no-gutters class="justify-space-between">
                  <v-col :cols="num_cols" v-for="k in num_beats" :key="`column-${layerId}-${j}-${k}`">
                    <Column 
                      class="column" :style="cssVars"
                      ref = "beats_refs"
                      :class="{playing : k*j-(k-num_beats)*(j-1) === isPlaying + 1}"
                      :beatId="k*j-1-(k-num_beats)*(j-1)"
                      :inst_selected="inst_id"
                      :num_beats="num_beats"
                      :duration="duration"
                      :prelistenBeat="prelistenLayer"
                      :muteLayer="muteLayer"
                      :isPlaying="isPlaying"
                      :tonesInScale="tonesInScale"
                      :scale_keyboard="scale_keyboard"
                    ></Column>
                  </v-col>
                </v-row>
              </v-carousel-item>
          </v-carousel>

        </v-col>

        <!-- LAYER CONTROLLER -->
        <v-col v-if="!unifiedControl" cols="3" class="hidden-xs-only">
          <v-container fluid class="layer-controller">
            <v-card flat style="background-color:transparent" class="" :height="`${singleLayerHeight-37}`">
              <v-card flat class="d-flex justify-space-around" style="background-color:transparent">
                <v-btn plain class="secondary black--text text-center" @click="$emit('removeLayerEvent')">Remove</v-btn>
                <v-card flat class="d-flex justify-space-around pa-1" style="background-color:transparent">
                  <v-btn icon :disabled="systemPlaying" small @click="$emit('addKeyEvent')">
                    <v-icon small color="primary">mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon :disabled="systemPlaying" small @click="$emit('removeKeyEvent')">
                    <v-icon small color="primary">mdi-minus</v-icon>
                  </v-btn>
                </v-card>
              </v-card>

              <!-- OCTAVE -->
              <v-menu :close-on-content-click="false"
                offset-y
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn depressed class="secondary black--text mt-2 caption" block v-on="on">
                    <span>Octave: {{octaveLayer}}</span>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="$emit('moreOctaveEvent')">
                    <v-icon left>mdi-plus</v-icon>
                    <v-list-item-title class="">Add an octave</v-list-item-title> 
                  </v-list-item>
                  <v-list-item @click="$emit('lessOctaveEvent')">
                    <v-icon left>mdi-minus</v-icon>
                    <v-list-item-title class="">Remove octave</v-list-item-title> 
                  </v-list-item>
                </v-list>
              </v-menu>
                
              <!-- KEY -->
              <v-menu :close-on-content-click="true"
                offset-y
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn depressed class="secondary black--text mt-2" block v-on="on">
                    <span class="caption">Selected key: {{keyLayer}}</span>
                  </v-btn>
                </template>
                <KeySelector @keySelectedEvent="function(val){$emit('keySelectedEvent',val)}"
                  :selectedKey="keyLayer"
                ></KeySelector>
              </v-menu>
              
              <!-- SCALE -->
              <v-menu :close-on-content-click="true"
                offset-y
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn depressed class="secondary black--text mt-2" block v-on="on">
                    <span class="caption">{{scaleLayer}}</span>
                  </v-btn>
                </template>
                <ScaleSelector @scaleSelectedEvent="function(val){$emit('scaleSelectedEvent',val)}"
                  :selectedScale="scaleLayer"
                ></ScaleSelector>
              </v-menu>

              <!-- BUTTONS -->
              <v-card flat class="mt-2 d-flex justify-space-around" style="background-color:transparent">
                <v-btn icon color="tertiary" class="layer-btn prelisten-btn" :class="{ green : prelistenLayer }" @click="prelistenLayer=!prelistenLayer">
                  <v-icon>mdi-headphones</v-icon> 
                </v-btn>
                <v-btn icon color="tertiary" class="layer-btn mute-btn" :class="{red : muteLayer }" @click="$emit('toggleMuteLayerEvent')">
                  <v-icon>mdi-volume-mute</v-icon>
                </v-btn>
                <v-btn icon color="tertiary" class="layer-btn clear-btn" @click="clearLayer">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card>

            </v-card>
          </v-container>
        </v-col>
      </v-row>
      <v-divider></v-divider>
  </v-card>
</template>

<script>

import Column from '@/components/Column.vue'
import ScaleSelector from '@/components/ScaleSelector.vue'
import KeySelector from '@/components/KeySelector.vue'

export default {
    name: 'Layer',
    
    components: {
        Column, ScaleSelector, KeySelector
    },
    
    props : {
        layerId: String,
        /** sequencer controller */
        unifiedControl: Boolean,
        n_bars: Number,
        inst_id: Number,
        duration: Array,
        total_duration: Number,
        /** state variables */
        num_beats: Number,
        octaveLayer: Number,
        keyLayer: String,
        scaleLayer: String,
        // prelistenLayer: Boolean,
        muteLayer: Boolean,
        singleLayerHeight: Number,
        automaticSlideControl: true,
        systemPlaying: Boolean
    },
    
    data() {
        return {
            isPlaying: -1,
            my_clock: '',
            tonesInScale: 8,
            keyboard: '',
            prelistenLayer: true,
            scale_keyboard : ["C4","D4","E4","F4","G4","A4","B4","C5"],
            drum_keyboard : ["kick", "snare", "tom 1","tom 2","closed hh", "open hh", "ride","clap"],
            model: 0,
        }
    },
    
    watch: {
        'isPlaying': function(val) {
            if(val==0){ this.$emit('restartEvent'); }
            if(this.automaticSlideControl){
              this.model=Math.floor(this.isPlaying/this.num_beats)
            }
        },
        'keyLayer': function(val) {
            this.$emit('changedKeyEvent', val);
            this.keyboardCreator()
        },
        'scaleLayer': function(val) {
            this.$emit('changedScaleEvent', val);
            this.keyboardCreator()
        },
        'octaveLayer': function(val) {
            this.$emit('changedOctaveEvent', val);
            this.keyboardCreator()
        },
    },
    
    computed: {
        num_cols() {return Math.floor(12/this.num_beats)},
        my_beat_duration() { return Number(this.total_duration/(this.num_beats)); },
        cssVars() {
            //let layerWidth = 1200;
            let margin = 5;
            let borderKey = 3;
            let keyHeight = 18;
            return {
                '--columnWidth': parseFloat(90/(this.num_beats)) + '%', //157
                '--columnHeight' : this.tonesInScale*(keyHeight + 2*borderKey) + 'px',
            }
        },
        heightHorizontal () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '73%'
          case 'sm': return '73%'
          case 'md': return '80%'
          case 'lg': return '82%'
          case 'xl': return '82%'
        }
      },
    },

    methods: {
        next() { this.isPlaying = (this.isPlaying + 1) % (this.num_beats*this.n_bars); },
        stop() { clearInterval(this.my_clock) },
        play() {
            this.stop();
            this.my_clock = setInterval(this.next, this.my_beat_duration)
        },
        keyboardCreator(){
            this.keyboard = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]
            this.keyboard = this.keyboard.map(ele => ele + this.octaveLayer)
            while(this.keyLayer + this.octaveLayer != this.keyboard[0]){
                let first_element = this.keyboard.shift()
                first_element = first_element.slice(0, -1) + (this.octaveLayer+1)
                this.keyboard = this.keyboard.concat(first_element)
            }
            switch(this.scaleLayer){
                case 'Major': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 2741 & (1 << index);
                });/*101010110101 and reversed = 2741*/
                this.scale_keyboard.push(this.scale_keyboard[0].slice(0, -1) + (this.octaveLayer+1))
                break;
                case 'Minor': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 1453 & (1 << index);
                });/*101101011010 and reversed = 1453*/
                this.scale_keyboard.push(this.scale_keyboard[0].slice(0, -1) + (this.octaveLayer+1))
                break;
                case 'Melodic Minor': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 2733 & (1 << index);
                });/*101010101101 and reversed = 2733*/
                this.scale_keyboard.push(this.scale_keyboard[0].slice(0, -1) + (this.octaveLayer+1))
                break;
                case 'Harmonic Minor': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 2477 & (1 << index);
                });/*100110101101 and reversed = 2477*/
                this.scale_keyboard.push(this.scale_keyboard[0].slice(0, -1) + (this.octaveLayer+1))
                break;
                case 'Diminished': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 1755 & (1 << index);
                });/*110110110110 and reversed = 2925*/
                
                break;
                case 'Augmented': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 2457 & (1 << index);
                });/*10011011001 and reversed = 2457*/
                this.scale_keyboard.push(this.scale_keyboard[0].slice(0, -1) + (this.octaveLayer+1))
                this.scale_keyboard.push(this.scale_keyboard[1].slice(0, -1) + (this.octaveLayer+1))
                break;
                case 'Hexatonic': this.scale_keyboard = this.keyboard.filter((value, index) => {
                    return 1365 & (1 << index);
                });/*101010101010 and reversed = 1365*/
                this.scale_keyboard.push(this.scale_keyboard[0].slice(0, -1) + (this.octaveLayer+1))
                this.scale_keyboard.push(this.scale_keyboard[1].slice(0, -1) + (this.octaveLayer+1))
                break;
            }
        },
        addLBar(){
          this.$nextTick(() =>{
            //column_states = Array(this.num_beats)
              for(let i=0;i<this.num_beats;i++) {
                let newvar = this.$refs.beats_refs[i].getKeyProps()
                this.$refs.beats_refs[i+(this.n_bars-1)*this.num_beats].setColumn(newvar)
                //column_states[i]=(newvar)
            }
          })
        },
        clearLayer(){
          for(let idx=0; idx<this.num_beats; idx++) { 
            this.$refs.beats_refs[idx].clearAllKeys() }
        },
    },
}
</script>

<style lang="scss">

.labels-container{
  border: 3px solid rgb(199, 202, 0);
  border-radius: 8px;
}
.secondary{
  opacity: 0.32;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px; 
}

.remove-btn-unified {
    background-color: rgb(194, 194, 194);
    // margin-top: 2px;
    // margin: 4px;
    text-align: center;
}
.layer{
    display: inline-flex;
    // height: calc(var(--columnHeight) + 10px);

}

.keyboard {
    display: inline-flex;
    //border-radius: 10px;
    background-color: rgb(199, 202, 0);
    //border:3px solid rgb(19, 109, 116);
}

.column {
    display: inline-block;
    //width: calc(var(--columnWidth) - 6px);
    //border: 3px solid #c0a630;
    //border: 3px solid #0000004d;
    border-radius: 8px;
    //margin: 5px;
}

.playing {
    /* aspect */
    border-top: 3px solid rgb(188, 180, 255);
    background: rgb(188, 180, 255);
    // border-bottom: 3px solid rgb(188, 180, 255);
    margin-top:-3px;
}
// .layer-labels{
//     margin-right: 10px;
//     margin-top: 8px;
//     width: auto;
// }
// .key-label{
//   // margin: 4px;
// }
.v-responsive{
  margin-top: -3px; 
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>