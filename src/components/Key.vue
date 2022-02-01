<template>
  <div @click="toggleActive">
    <v-btn
        block
        elevation="2"
        outlined
        raised
        rounded
        small
    >
      <div class="key"
        :class="{active : state1 || state2 || state3}"
        :style="cssVars">
      </div>
    </v-btn>    
  </div>
</template>

<script>
export default {
    name: 'Key',

    props: {
        keyId: {type: Number },
        beatId: { type: Number },
        inst_selected:{ type: Number },
        prelistenBeat: { type: Boolean, default: true},
        muteBeat: { type: Boolean, default: true},
        muteLayer: { type: Boolean, default: true},
        isPlaying: { type: Number },        
    },

    data() {
        return {    
            state1: false,
            state2: false,
            state3: false,
            last_color: 0,
            very_last_color: 0,
        }
    },
    
    watch: {
        'isPlaying': function() {
            if(!this.muteBeat && this.isPlaying == this.beatId) { 
                this.playKey();
            } 
        }
    },

    computed: {
        cssVars() {
            var CSScolors = ['rgb(255, 0, 0)','rgb(0, 0, 255)','rgb(0, 255, 0)']
            if(this.state1 && this.state2 &&this.state3){
                return {
                    '--inst_color': CSScolors[3-this.very_last_color-this.last_color],
                    '--shadow': '-7px 0 '+CSScolors[this.very_last_color]+',-14px 0 '+CSScolors[this.last_color],
                    '--inst_shift': '7px',
                    }
                }
            if(this.state1 && this.state2){
                this.very_last_color = Math.abs(this.last_color-1)
                return {
                    '--inst_color': CSScolors[this.very_last_color],
                    '--shadow': '-7px 0 '+ CSScolors[this.last_color],
                    '--inst_shift': '3.5px',
                    }
                }
            if(this.state2 && this.state3){
                this.very_last_color = Math.abs(this.last_color-3)
                return {
                    '--inst_color': CSScolors[this.very_last_color],
                    '--shadow': '-7px 0 '+CSScolors[this.last_color],
                    '--inst_shift': '3.5px',
                    }
                }
            if(this.state1 && this.state3){
                this.very_last_color = Math.abs(this.last_color-2)
                return {
                    '--inst_color': CSScolors[this.very_last_color],
                    '--shadow': '-7px 0 '+CSScolors[this.last_color],
                    '--inst_shift': '3.5px',
                    }
                }
            if(this.state1){
                this.last_color = 0
                return {
                    '--inst_color': CSScolors[0],
                    '--inst_shift': '0px',
                    }
                }
            else if(this.state2){
                this.last_color = 1
                return {
                    '--inst_color': CSScolors[1],
                    '--inst_shift': '0px',
                    }
                }
            else if(this.state3){
                this.last_color = 2
                return {
                    '--inst_color': CSScolors[2],
                    '--inst_shift': '0px',
                }
            }
        }
    },

    methods: {
        toggleActive() {
            switch(this.inst_selected){
                case 1:
                    this.state1 = !this.state1
                    if(!this.muteBeat && this.prelistenBeat && this.state1){
                        this.$emit('playSound1Event',this.keyId)
                    } break;
                case 2: 
                    this.state2 = !this.state2
                    if(!this.muteBeat && this.prelistenBeat && this.state2){
                        this.$emit('playSound2Event',this.keyId)
                    } break; 
                case 3: 
                    this.state3 = !this.state3
                    if(!this.muteBeat && this.prelistenBeat && this.state3){
                        this.$emit('playSound3Event',this.keyId)
                    } break;
            } 
        },

        playKey() {
            if(this.state1){
                this.$emit('playSound1Event',this.keyId)
            }
            if(this.state2){
                this.$emit('playSound2Event',this.keyId)
            }
            if(this.state3){
                this.$emit('playSound3Event',this.keyId)
            }
        },

        clearKey() {
            if(this.state1){ this.state1 = !this.state1 }
            if(this.state2){ this.state2 = !this.state2 }
            if(this.state3){ this.state3 = !this.state3 }
        },
        setKey(state1,state2,state3){
            this.state1=state1
            this.state2=state2
            this.state3=state3
        }
    },

}
</script>

<style lang="scss">
.key {
    /* location */
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* aspect */
    width: 10px;
    height: 10px;
    background-color: #575757;
    padding: none;
    border: 2px solid #0000004d;
    border-radius: 100%;

}

.active {
    position: relative;
    left: calc(var(--columnWidth)/2 - 6px + var(--inst_shift));
    width: 14px;
    height: 14px;
    border-radius: 100%;
    border: none;
    background-color: var(--inst_color);
    box-shadow: var(--shadow);
}
</style>