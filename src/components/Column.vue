<template>
    <v-container class="pa-0">
      <div>
        <Key 
            v-for="k in tonesInScale"
            ref="keys_refs"
            :key=tonesInScale-k
            :keyId=tonesInScale-k
            :beatId="beatId"
            :inst_selected="inst_selected"
            :prelistenBeat="prelistenBeat"
            :muteBeat="muteBeat"
            :muteLayer="muteLayer"
            :isPlaying="isPlaying"
            @playSound1Event="playInst1"
            @playSound2Event="playInst2"
            @playSound3Event="playInst3"
        ></Key>
        <v-card v-if="num_beats<=6" outlined class="d-flex justify-space-around py-2">
          <!-- <v-icon dense @click="monitorBeat">mdi-headphones</v-icon>
          <v-icon dense :class="{ red : muteBeat }" @click="muteBeat=!muteBeat">mdi-volume-mute</v-icon>
          <v-icon dense @click="clearAllKeys">mdi-delete</v-icon> -->
          <v-btn small icon @click="monitorBeat">
            <v-icon >mdi-headphones</v-icon>
          </v-btn>
          <v-btn icon small :class="{ red : muteBeat }"
            @click="muteBeat=!muteBeat">
            <v-icon >mdi-volume-mute</v-icon>
          </v-btn>
          <v-btn icon small @click="clearAllKeys">
            <v-icon >mdi-delete</v-icon>
          </v-btn>
        </v-card>
        <v-card v-else outlined>
          <v-menu offset-x :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-menu-right</v-icon>
            </template>
            <v-card outlined class="d-flex justify-space-around py-2">
              <v-btn icon class="mx-2" @click="monitorBeat">
                <v-icon dense>mdi-headphones</v-icon>
              </v-btn>
              <v-btn icon class="mx-2" :class="{ red : muteBeat }"
                @click="muteBeat=!muteBeat">
                <v-icon dense>mdi-volume-mute</v-icon>
              </v-btn>
              <v-btn icon class="mx-2" @click="clearAllKeys">
                <v-icon dense>mdi-delete</v-icon>
              </v-btn>
            </v-card>
          </v-menu>
        </v-card>
      </div>
    </v-container>
</template>

<script>
import Key from '@/components/Key.vue'

export default ({
    name: 'Column',

    components : { 
        Key
    },

    props : ['beatId','num_beats','inst_selected','duration','prelistenBeat','muteLayer','isPlaying','tonesInScale','scale_keyboard'],
    
    data() {
        return {
            muteBeat: false,
            key_state1: [], 
            key_state2: [], 
            key_state3: [], 
        }
    },

    watch: {
        'muteLayer' : function(val) {
            this.muteBeat = val;
        }
    },

    computed: {
        synth1() {
            return this.$store.state.synth1
        },
        synth2() {
            return this.$store.state.synth2
        },
        drum() {
            return this.$store.state.drum
        }
    },

    methods : {
        playInst1(keyId){
            this.synth1.triggerAttackRelease(this.scale_keyboard[keyId],this.duration[0])
        },
        playInst2(keyId){
            this.synth2.triggerAttackRelease(this.scale_keyboard[keyId],this.duration[1])
        },
        playInst3(keyId){
            this.drum[keyId].start();
        },
        getKeyProps() {
            for(let j=0; j<this.tonesInScale; j++){
                this.key_state1[j]=this.$refs.keys_refs[j].state1;
                this.key_state2[j]=this.$refs.keys_refs[j].state2;
                this.key_state3[j]=this.$refs.keys_refs[j].state3;
            }
            return [this.key_state1, this.key_state2, this.key_state3]

        },
        setColumn(newvar){
            this.key_state1=newvar[0]
            this.key_state2=newvar[1]
            this.key_state3=newvar[2]
            for(let j=0;j<this.tonesInScale;j++){
                this.$refs.keys_refs[j].setKey(this.key_state1[j],this.key_state2[j],this.key_state3[j])
            }
        },
        monitorBeat(){
            for(let idx=0; idx<this.tonesInScale; idx++) { 
                this.$refs.keys_refs[idx].playKey() }
        },
        clearAllKeys(){
            for(let idx=0; idx<this.tonesInScale; idx++) { 
                this.$refs.keys_refs[idx].clearKey() 
            }
        }
    },
})

</script>

<style lang="scss">
.keyback {
    width: auto;
    //height: 18px;
    background-color: rgb(107, 216, 183);
    //border: 3px solid #0000004d;
    border-radius: 8px;
}
#beat-controller {
    width: auto;
    height: auto;
    //margin: 1px;
    //border: 2px solid #575757;
    background-color: rgb(216, 216, 190);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
}
.beat-btn {
    width: 30%;
    height: auto;
    margin: 2px auto 2px;
    text-align: center;
}

</style>
