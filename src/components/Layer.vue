<template>
    <div class="layer">
            <div class="layer-labels">
                <div v-if="inst_id==3">
                    <p class="key-label" 
                        v-for="k in tonesInScale"
                        :key="k"
                    >{{drum_keyboard[tonesInScale-k]}}
                    </p>
                </div>
                <div v-else>
                    <p class="key-label" 
                        v-for="k in tonesInScale"
                        :key="k"
                    >{{scale_keyboard[tonesInScale-k].slice(0, -1)}}
                    </p>
                </div>
                <button v-if="unifiedControl" class="remove-btn-unified" @click="$emit('removeLayerEvent')">Remove layer</button>
            </div>
            
            <div v-for="j in n_bars" :key="j">
                <div class="keyboard">
                    <Column v-for="k in num_beats"
                        class="column" :style="cssVars"
                        ref = beats_refs
                        :key="k"
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
                </div>
            </div>
            
            <div v-if="!unifiedControl" class="layer-controller">
                <div id="buttons">
                    <button id="remove-btn" @click="$emit('removeLayerEvent')">Remove layer</button>
                    <button id="addKey-btn" @click="$emit('addKeyEvent')"> + </button>
                    <button id="removeKey-btn" @click="$emit('removeKeyEvent')"> - </button>
                </div>
                <KeySelector :selectedKey="keyLayer"
                    @keySelectedEvent="function(val){$emit('keySelectedEvent',val)}"
                ></KeySelector>
                <ScaleSelector :selectedScale="scaleLayer"
                    @scaleSelectedEvent="function(val){$emit('scaleSelectedEvent',val)}"
                ></ScaleSelector>
                <div id="octave-selector">
                    <div class="octave-viewer">Octave: {{octaveLayer}} </div>
                    <button class="layer-btn" @click="$emit('moreOctaveEvent')"> + </button>
                    <button class="layer-btn" @click="$emit('lessOctaveEvent')"> - </button>
                </div>
                <div class="layer-sound-controller">
                    <button class="layer-btn prelisten-btn" :class="{ prelistenActive : prelistenLayer }" @click="$emit('togglePrelistenLayerEvent')">L</button>
                    <button class="layer-btn mute-btn" :class="{ muteActive : muteLayer }" @click="$emit('toggleMuteLayerEvent')">M</button>
                    <button class="layer-btn clear-btn" @click="clearLayer">C</button>
                </div>
            </div>
        </div>
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
    },
    
    data() {
        return {
            isPlaying: -1,
            my_clock: '',
            tonesInScale: 8,
            keyboard: '',
            scale_keyboard : ["C4","D4","E4","F4","G4","A4","B4","C5"],
            drum_keyboard : ["kick", "snare", "tom 1","tom 2","closed hh", "open hh", "ride","cowbell"],
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
        my_beat_duration() { return Number(this.total_duration/(this.num_beats)); },
        cssVars() {
            let layerWidth = 1200;
            let margin = 5;
            let borderKey = 3;
            let keyHeight = 18;
            return {
                '--columnWidth': (layerWidth - this.num_beats*2*margin)/(this.num_beats) + 'px', //157
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
    margin-top: 2px;
    text-align: center;
}
.layer{
    display: inline-flex;
    height: calc(var(--columnHeight) + 10px);
    margin: 10px;
}
.keyboard {
    display: inline-flex;
    border-radius: 10px;
    background-color: rgb(199, 202, 0);
    border:3px solid rgb(19, 109, 116);
}
.column {
    display: inline-block;
    width: calc(var(--columnWidth) - 6px);
    height: auto;
    background-color: #c0a630;
    border: 3px solid #0000004d;
    border-radius: 8px;
    margin: 5px;
}
.playing {
    /* aspect */
    border: 3px solid rgb(188, 180, 255);
}
.layer-labels{
    margin-right: 10px;
    margin-top: 8px;
    width: auto;
}
.key-label{
    border: 2px solid rgb(216, 216, 178);
    background-color: bisque;
    width: 90px;
    height: 20px;
    margin: 0px;
    text-align: center;
}
</style>