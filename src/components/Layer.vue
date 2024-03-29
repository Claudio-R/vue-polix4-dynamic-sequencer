<template>
  <v-card :min-height="heightHorizontal" flat tile class="background my-0">
      <v-row no-gutters>
        <!-- LABELS -->
        <v-col cols="2">
          <v-container>
            <div v-if="inst_id!=2" class="">
              <v-card flat outlined class="secondary text-center hidden-xs-only" elevation="3" style="opacity:0.7;" 
                v-for="k in tonesInScale" :key="k"
                >{{scale_keyboard[tonesInScale-k].slice(0, -1)}}
              </v-card>
            </div>
            <div v-else class="">
              <v-card outlined flat class="secondary text-center hidden-xs-only" elevation="3" style="opacity:0.7;"
                v-for="k in tonesInScale" :key="k"
                >{{drum_keyboard[tonesInScale-k]}}
              </v-card>
            </div>
            <v-btn block depressed v-if="unifiedControl" class="fourth text-center black--text hidden-xs-only" @click="$emit('removeLayerEvent')">Remove</v-btn>
          </v-container>
        </v-col>

        <!-- BEATS -->
        <!-- Unmerged Controller -->
        <v-col v-if="!unifiedControl" cols="12" sm="7">
          <v-slide-group class="disable-arrows"
          height="100%"
          v-model="model">
              <v-slide-item v-for="j in n_bars" :key="`keyboard-${layerId}-${j}`" class="spacing-playground py-3 pr-2 pl-2">
              <v-row no-gutters class="justify-space-between">
                <v-col v-for="k in num_beats" :key="`column-${layerId}-${j}-${k}`">
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
                    :n_bars="n_bars"
                  ></Column>
                </v-col>
              </v-row>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <!-- Merged Controller -->
        <v-col v-else cols="12" sm="10">
          <v-slide-group class="disable-arrows"
          height="100%"
          v-model="model">
              <v-slide-item v-for="j in n_bars" :key="`keyboard-${layerId}-${j}`" class="spacing-playground py-3 pr-2 pl-2">
                <v-row no-gutters class="justify-space-between">
                  <v-col  v-for="k in num_beats" :key="`column-${layerId}-${j}-${k}`">
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
                      :n_bars="n_bars"
                    ></Column>
                  </v-col>
                </v-row>
              </v-slide-item>
          </v-slide-group>

        </v-col>

        <!-- LAYER CONTROLLER -->
        <v-col v-if="!unifiedControl" cols="3" class="hidden-xs-only">
          <v-container fluid class="layer-controller">
            <v-card flat style="background-color:transparent" class="" :height="`${singleLayerHeight-37}`">
              <v-card flat class="d-flex justify-space-around" style="background-color:transparent">
                <v-btn plain class="fourth black--text text-center" @click="$emit('removeLayerEvent')">Remove</v-btn>
                <v-card flat class="d-flex justify-space-around pa-1" style="background-color:transparent">
                  <v-btn icon :disabled="systemPlaying" small @click="$emit('addKeyEvent')">
                    <v-icon small color="">mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon :disabled="systemPlaying" small @click="$emit('removeKeyEvent')">
                    <v-icon small color="">mdi-minus</v-icon>
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
                  <v-btn depressed class="five mt-2 caption" block v-on="on">
                    <span>Octave: {{octaveLayer}}</span>
                  </v-btn>
                </template>
                <v-card flat dense class="d-flex secondary justify-space-around pa-6" style="opacity: 1; box-shadow: none;">
              <v-btn icon large @click="$emit('moreOctaveEvent')">
                <v-icon color="black" >mdi-plus</v-icon>
              </v-btn>
              <v-btn icon large @click="$emit('lessOctaveEvent')">
                <v-icon color="black">mdi-minus</v-icon>
              </v-btn>
            </v-card>
              </v-menu>
                
              <!-- KEY -->
              <v-menu :close-on-content-click="true"
                offset-y
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn depressed class="five mt-2" block v-on="on">
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
                  <v-btn depressed class="five mt-2" block v-on="on">
                    <span class="caption">{{scaleLayer}}</span>
                  </v-btn>
                </template>
                <ScaleSelector @scaleSelectedEvent="function(val){$emit('scaleSelectedEvent',val)}"
                  :selectedScale="scaleLayer"
                ></ScaleSelector>
              </v-menu>

              <!-- BUTTONS -->
              <v-card flat class="mt-3 d-flex justify-space-around" style="background-color:transparent">
                <v-btn icon class="layer-btn prelisten-btn" :class="{ 'green lighten-2' : prelistenLayer }" @click="prelistenLayer=!prelistenLayer">
                  <v-icon>mdi-headphones</v-icon> 
                </v-btn>
                <v-btn icon class="layer-btn mute-btn" :class="{red : muteLayer }" @click="$emit('toggleMuteLayerEvent')">
                  <v-icon>mdi-volume-mute</v-icon>
                </v-btn>
                <v-btn icon class="layer-btn clear-btn" @click="clearLayer">
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
              for(let i=0;i<this.num_beats;i++) {
                let newvar = this.$refs.beats_refs[i].getKeyProps()
                this.$refs.beats_refs[i+(this.n_bars-1)*this.num_beats].setColumn(newvar)
            }
          })
        },
        clearLayer(){
          for(let idx=0; idx<this.num_beats*this.n_bars; idx++) { 
            this.$refs.beats_refs[idx].clearAllKeys() }
        },
    },
}
</script>

<style lang="scss">

.secondary{
  opacity: 0.32;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px; 
}

.playing {
    /* aspect */
    border-top: 3px solid var(--v-player-base);
    background: var(--v-player-base);
    margin-top:-3px;
}

.v-responsive{
  margin-top: -3px; 
  padding-top: 3px;
  padding-bottom: 3px;
}

.v-slide-group__next--disabled .disable-arrows, .v-slide-group__prev--disabled .disable-arrows { 
  pointer-events: none; 
  color: rgba(0, 0, 0, 0.38) !important; 
  }

</style>