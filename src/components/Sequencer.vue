<template>
  <div>
    <div class="view-box">
        <div class="viewer">BPM: {{bpm}}</div>
        <div class="viewer">Selected instrument: {{inst_name[inst_id-1]}}</div>
        <div class="viewer">Bars: {{n_bars}}</div>
        <button class="add btn" @click="if(n_bars<4){n_bars++; addBar()}"> + </button>
        <button class="add btn" @click="if(n_bars>1){n_bars--}"> - </button>
    </div>
    
    <MainController
        @unifiedControllerEvent="unifiedControl=!unifiedControl"
        @newLayerEvent="addLayer"
        @bpmEvent="updateBPM"
        @instSelectionEvent="instSelected"
        @durationEvent="changeDuration"
        @playAllEvent="playAll"
        @stopAllEvent="stopAll"
    ></MainController>

    <div v-if="unifiedControl" class="layer-controller unified">
        <KeySelector @keySelectedEvent="changeKey"
            :selectedKey="allLayersKey"
        ></KeySelector>
        <ScaleSelector @scaleSelectedEvent="changeScale"
            :selectedScale="allLayersScale"
        ></ScaleSelector>
        <div class="octave-sound-controller">
            <div id="octave-selector">
                <div class="octave-viewer">Octave: {{allLayersOctave}} </div>
                <button @click="moreOctave"> + </button>
                <button @click="lessOctave"> - </button>
            </div>
            <div class="layer-sound-controller">
                <button class="layer-btn prelisten-btn" :class="{ prelistenActive : prelistenSystem }" @click="togglePrelistenSystem">L</button>
                <button class="layer-btn mute-btn" :class="{ muteActive : muteSystem }" @click="toggleMuteSystem">M</button>
                <button class="layer-btn clear-btn" @click="clearSystem">C</button>
            </div>
        </div>
    </div>
            
        <div id="layers-container">
            <Layer v-for="(layer,index) in layers"
                ref="layers_refs"
                :unifiedControl="unifiedControl"
                :n_bars="n_bars"
                :inst_id="inst_id"
                :duration="duration"
                :total_duration="total_duration"
                :key="layer.id"
                :num_beats="layer.num_beats"
                :octaveLayer="layer.octaveLayer"
                :keyLayer="layer.keyLayer"
                :scaleLayer="layer.scaleLayer"
                :prelistenLayer="layer.prelistenLayer"
                :muteLayer="layer.muteLayer"
                @restartEvent="restart(index)"
                @removeLayerEvent="layers.splice(index,1)"
                @addKeyEvent="if(!systemPlaying && layer.num_beats < 12 ) layer.num_beats++"
                @removeKeyEvent="if(!systemPlaying && layer.num_beats > 1 ) layer.num_beats--"
                @keySelectedEvent="function(val) {layer.keyLayer = val}"
                @scaleSelectedEvent="function(val) {layer.scaleLayer = val}"
                @moreOctaveEvent="if(layer.octaveLayer < 6) layer.octaveLayer++"
                @lessOctaveEvent="if(layer.octaveLayer > 2) layer.octaveLayer--"
                @togglePrelistenLayerEvent="layer.prelistenLayer = !layer.prelistenLayer"
                @toggleMuteLayerEvent="layer.muteLayer = !layer.muteLayer"
            ></Layer>
        </div>
    </div>
</template>

<script>
import Layer from '@/components/Layer.vue'
import MainController from '@/components/MainController.vue'
import ScaleSelector from '@/components/ScaleSelector.vue'
import KeySelector from '@/components/KeySelector.vue'

export default {
  name: 'Sequencer',
  
  props: {
    msg: String
  },

  components: {
    Layer, 
    MainController, 
    ScaleSelector, 
    KeySelector
  },

  data(){
        return {
            /** sequencer controller */
            systemPlaying: false,
            bpm: 120,
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
            inst_name: ['nome_strumento1','nome_strumento2','drum: TR-808'],
            
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
                    num_beats: 2,
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
        }
    },

    methods: {
        /** sequencer controller */
        addLayer(num_beats_input) {
            if(num_beats_input > 12) num_beats_input = 12;
            this.layers.push(
                {   
                    id: this.nextId,
                    num_beats: num_beats_input,
                    octaveLayer: this.allLayersOctave,
                    keyLayer: this.allLayersKey,
                    scaleLayer: this.allLayersScale,
                    prelistenLayer: this.prelistenSystem,
                    muteLayer: this.muteSystem,
                }
            )
            this.nextId += 1;
        },
        updateBPM(bpm_input) {
            this.bpm = bpm_input
        },
        addBar(){
            for(idx in this.layers) {
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
            for(idx in this.layers) {
                this.$refs.layers_refs[idx].isPlaying = 0
            }
            for(idx in this.layers) {
                this.$refs.layers_refs[idx].play()
            }
        },
        stopAll() {
            this.systemPlaying = false
            for(idx in this.layers) {
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
            for(idx in this.layers) {
                this.layers[idx].keyLayer = this.allLayersKey;
            }
        },
        changeScale(num_scale){
            this.allLayersScale = num_scale;
            for(idx in this.layers) {
                this.layers[idx].scaleLayer = this.allLayersScale;
            }
        },
        moreOctave(){
            if(this.allLayersOctave < 6){ 
                this.allLayersOctave++;
                for(idx in this.layers) {
                    this.layers[idx].octaveLayer = this.allLayersOctave;
                }
            }
        },
        lessOctave(){
            if(this.allLayersOctave > 2){
                this.allLayersOctave--;
                for(idx in this.layers) {
                    this.layers[idx].octaveLayer = this.allLayersOctave;
                    //this.$refs.layers_refs[idx].lessOctave()
                }
            }
        },
        togglePrelistenSystem() { 
            this.prelistenSystem = !this.prelistenSystem;
            for(idx in this.layers) { 
                this.layers[idx].prelistenLayer = this.prelistenSystem; 
            }
        },
        toggleMuteSystem() { 
            this.muteSystem = !this.muteSystem;
            for(idx in this.layers) { 
                this.layers[idx].muteLayer = this.muteSystem; 
            }
        },
        clearSystem() {
            for(idx in this.layers) {
                this.$refs.layers_refs[idx].clearLayer();
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
