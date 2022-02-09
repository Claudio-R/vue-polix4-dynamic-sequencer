<template>
<v-carousel-item>
  <v-card height="100%" flat tile class="my-0">
      <v-row no-gutters>
        <!-- LABELS -->
        <v-col cols="2">
          <v-container class="">
            <div v-if="inst_id==2">
              <v-card flat outlined class="text-center" 
                v-for="k in tonesInScale" :key="k"
                >{{drum_keyboard[tonesInScale-k]}}
              </v-card>
            </div>
            <div v-else>
              <v-card flat outlined class="text-center" 
                v-for="k in tonesInScale" :key="k"
                >{{scale_keyboard[tonesInScale-k].slice(0, -1)}}
              </v-card>
            </div>
            <v-btn block v-if="unifiedControl" class="text-center" @click="$emit('removeLayerEvent')">Remove</v-btn>
          </v-container>
        </v-col>

        <!-- BEATS -->
        <!-- Unmerged Controller -->
        <v-col v-if="!unifiedControl" cols="7">
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
        <v-col v-else cols="10">
          <v-carousel hide-delimiters
          height="100%"
          :continuous="false">
              <v-carousel-item v-for="j in n_bars" :key="`keyboard-${layerId}-${j}`">
                <v-row no-gutters class="justify-space-between">
                  <v-col :cols="num_cols" v-for="k in num_beats" :key="`column-${layerId}-${j}-${k}`" class="spacing-playground pa-3">
                    <Column 
                      class="column" :style="cssVars"
                      ref = "beats_refs"
                      :class="{playing : k*j-(k-num_beats)*(j-1) === isPlaying + 1}"
                      :beatId="k*j-1-(k-num_beats)*(j-1)"
                      :inst_selected="inst_id"
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
        <v-col v-if="!unifiedControl" cols="3">
          <v-container class="layer-controller">
            <v-card flat class="pa-1" :height="`${singleLayerHeight-37}`">
            <div class="d-flex">
              <v-btn class="text-center" @click="$emit('removeLayerEvent')">Remove</v-btn>
              <div class="pa-1">
                <v-btn icon small class="text-center" @click="$emit('addKeyEvent')">
                  <v-icon small>mdi-plus</v-icon>
                </v-btn>
                <v-btn icon small class="text-center" @click="$emit('removeKeyEvent')">
                  <v-icon small>mdi-minus</v-icon>
                </v-btn>
              </div>
            </div>

              <!-- OCTAVE -->
              <v-menu offset-y :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <v-btn class="mt-2 caption" block v-on="on">
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
              <v-menu offset-y :close-on-content-click="true">
                <template v-slot:activator="{ on }">
                  <v-btn class="mt-2" block v-on="on">
                    <span class="caption">Selected key: {{keyLayer}}</span>
                  </v-btn>
                </template>
                <KeySelector @keySelectedEvent="function(val){$emit('keySelectedEvent',val)}"
                  :selectedKey="keyLayer"
                ></KeySelector>
              </v-menu>
              
              <!-- SCALE -->
              <v-menu offset-x :close-on-content-click="true">
                <template v-slot:activator="{ on }">
                  <v-btn class="mt-2" block v-on="on">
                    <span class="caption">{{scaleLayer}}</span>
                  </v-btn>
                </template>
                <ScaleSelector @scaleSelectedEvent="function(val){$emit('scaleSelectedEvent',val)}"
                  :selectedScale="scaleLayer"
                ></ScaleSelector>
              </v-menu>

              <div class="mt-2 d-flex justify-space-between">
                <v-btn small class="layer-btn prelisten-btn" :class="{ prelistenActive : prelistenLayer }" @click="$emit('togglePrelistenLayerEvent')">L</v-btn>
                <v-btn small class="layer-btn mute-btn" :class="{ muteActive : muteLayer }" @click="$emit('toggleMuteLayerEvent')">M</v-btn>
                <v-btn small class="layer-btn clear-btn" @click="clearLayer">C</v-btn>
              </div>

            </v-card>
          </v-container>
        </v-col>
      </v-row>
  </v-card>
  </v-carousel-item>
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
        prelistenLayer: Boolean,
        muteLayer: Boolean,
        singleLayerHeight: Number,
    },
    
    data() {
        return {
            isPlaying: -1,
            my_clock: '',
            tonesInScale: 8,
            keyboard: '',
            scale_keyboard : ["C4","D4","E4","F4","G4","A4","B4","C5"],
            drum_keyboard : ["kick", "snare", "tom 1","tom 2","closed hh", "open hh", "ride","clap"],
        }
    },
    
    watch: {
        'isPlaying': function(val) {
            if(val==0){ this.$emit('restartEvent'); }
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
        num_cols() {return Math.max(1, Math.floor(12/this.num_beats))},
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
            for(let idx=0; idx<this.$refs.beats_refs.length; idx++) { 
                this.$refs.beats_refs[idx].clearAllKeys() }
        },
    },
}
</script>

<style lang="scss">
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
    height: auto;
    background-color: #c0a630;
    //border: 3px solid #0000004d;
    border-radius: 8px;
    //margin: 5px;
}

.playing {
    /* aspect */
    border: 3px solid rgb(188, 180, 255);
}
// .layer-labels{
//     margin-right: 10px;
//     margin-top: 8px;
//     width: auto;
// }
// .key-label{
//   // margin: 4px;
// }
</style>