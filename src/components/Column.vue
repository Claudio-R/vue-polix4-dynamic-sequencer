<template>
    <div>
        <Key 
            v-for="k in tonesInScale"
            class="keyback"
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
        <div id="beat-controller">
            <button class="beat-btn monitor-btn" @click="monitorBeat">P</button>
            <button class="beat-btn mute-btn" :class="{ muteActive : muteBeat }" @click="muteBeat=!muteBeat">M</button>
            <button class="beat-btn clear-btn" @click="clearAllKeys">C</button>
        </div>
    </div>
</template>

<script>
import { KeyComponent } from '@/components/KeyComponent.vue'

export default ({
    name: 'Column',

    components : { 
        KeyComponent
    },

    props : ['beatId','inst_selected','duration','prelistenBeat','muteLayer','isPlaying','tonesInScale','scale_keyboard'],
    
    data() {
        return {
            muteBeat: false,
        }
    },

    watch: {
        'muteLayer' : function(val) {
            this.muteBeat = val;
        }
    },

    methods : {
        playInst1(keyId){
            synth1.triggerAttackRelease(this.scale_keyboard[keyId],this.duration[0])
        },
        playInst2(keyId){
            synth2.triggerAttackRelease(this.scale_keyboard[keyId],this.duration[1])
        },
        playInst3(keyId){
            drum[keyId].start();
        },
        getKeyProps() {
            var key_state1 = []
            var key_state2 = []
            var key_state3 = []
            for(j=0;j<this.tonesInScale;j++){
                key_state1[j]=this.$refs.keys_refs[j].state1;
                key_state2[j]=this.$refs.keys_refs[j].state2;
                key_state3[j]=this.$refs.keys_refs[j].state3;
            }
            return {key_state1,key_state2,key_state3}
        },
        setColumn(newvar){
            key_state1=newvar.key_state1
            key_state2=newvar.key_state2
            key_state3=newvar.key_state3
            for(j=0;j<this.tonesInScale;j++){
                this.$refs.keys_refs[j].setKey(key_state1[j],key_state2[j],key_state3[j])
            }
        },
        monitorBeat(){
            for(var idx=0; idx<tonesInScale; idx++) { 
                this.$refs.keys_refs[idx].playKey() }
        },
        clearAllKeys(){
            for(var idx=0; idx<this.tonesInScale; idx++) { 
                this.$refs.keys_refs[idx].clearKey() 
            }
        }
    },
})
</script>
