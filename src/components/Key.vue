<template>
  <v-card flat outlined @click="toggleActive" style="min-height: 26px; max-height: 26px; min-width: 35px" elevation="1"
    :class="{'drum lighten-1 text-center' : state3, 'tertiary text-center' : !state3}">
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
