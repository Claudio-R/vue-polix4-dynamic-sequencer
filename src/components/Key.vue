<template>
  <v-card flat outlined class="tertiary text-center" @click="toggleActive" style="min-height: 26px; max-height: 26px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border: 1px #9b9b9c;"
    :class="{'green accent-2' : state3}">
    <v-icon v-if="!(state1 || state2)" small>mdi-circle</v-icon>
    <v-icon v-if="state1" small color="red">mdi-circle</v-icon>
    <v-icon v-if="state2" small color="blue">mdi-circle</v-icon>
  </v-card>

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

    // computed: {
    //   current_color() {
    //     if(this.state1 && !(this.state2 && this.state3)){ return 'red' }
    //     if(this.state2 && !(this.state1 && this.state3)){ return 'blue' }
    //     if(this.state3 && !(this.state1 && this.state2)){ return 'green' }
    //   },
    //     cssVars() {
    //         let CSScolors = ['red','blue','green']
    //         if(this.state1 && this.state2 && this.state3){
    //             return {
    //                 '--inst_color': CSScolors[3-this.very_last_color-this.last_color],
    //                 '--shadow': '-7px 0 '+CSScolors[this.very_last_color]+',-14px 0 '+CSScolors[this.last_color],
    //                 '--inst_shift': '50%',
    //                 }
    //             }
    //         if(this.state1 && this.state2){
    //             this.very_last_color = Math.abs(this.last_color-1)
    //             return {
    //                 '--inst_color': CSScolors[this.very_last_color],
    //                 '--shadow': '-7px 0 '+ CSScolors[this.last_color],
    //                 // '--inst_shift': '3.5px',
    //                 '--inst_shift': '25%',
    //                 }
    //             }
    //         if(this.state2 && this.state3){
    //             this.very_last_color = Math.abs(this.last_color-3)
    //             return {
    //                 '--inst_color': CSScolors[this.very_last_color],
    //                 '--shadow': '-7px 0 '+CSScolors[this.last_color],
    //                 // '--inst_shift': '3.5px',
    //                 '--inst_shift': '25%',
    //                 }
    //             }
    //         if(this.state1 && this.state3){
    //             this.very_last_color = Math.abs(this.last_color-2)
    //             return {
    //                 '--inst_color': CSScolors[this.very_last_color],
    //                 '--shadow': '-7px 0 '+CSScolors[this.last_color],
    //                 '--inst_shift': '25%',
    //                 }
    //             }
    //         if(this.state1){
    //             this.last_color = 0
    //             return {
    //                 '--inst_color': CSScolors[0],
    //                 // '--inst_shift': '0px',
    //                 '--inst_shift': '-0%',
    //                 }
    //             }
    //         else if(this.state2){
    //             this.last_color = 1
    //             return {
    //                 '--inst_color': CSScolors[1],
    //                 // '--inst_shift': '0px',
    //                 '--inst_shift': '-0%',
    //                 }
    //             }
    //         else if(this.state3){
    //             this.last_color = 2
    //             return {
    //                 '--inst_color': CSScolors[2],
    //                 '--inst_shift': '-0%',
    //             }
    //         }
    //     }
    // },

    methods: {
      toggleActive() {
        switch(this.inst_selected){
          case 0:
              this.state1 = !this.state1
              if(!this.muteBeat && this.prelistenBeat && this.state1){
                  this.$emit('playSound1Event',this.keyId)
              } break;
          case 1: 
              this.state2 = !this.state2
              if(!this.muteBeat && this.prelistenBeat && this.state2){
                  this.$emit('playSound2Event',this.keyId)
              } break; 
          case 2: 
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
//.key {
    /* location */
    // display: block;
    // position: relative;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    /* aspect */
    // width: 10px;
    // height: 10px;
    // background-color: #575757;
    // padding: none;
    // border: 2px solid #0000004d;
    // border-radius: 100%;
    // background: blue;

//}

.active {
    position: relative;
    // left: calc(4px + var(--inst_shift));
    transform: translate(var(--inst_shift));
    background: var(--inst_color);
    box-shadow: var(--shadow);
}

</style>
