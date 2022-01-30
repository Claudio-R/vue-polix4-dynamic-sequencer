<template>
<div v-if="id!=3">
    <div class="selector"> {{ synths[selectedSynth]}}
        <MenuElement 
            v-for="(mode,index) in synths"
            class="menu-element"
            :key="index"
            :element="mode"
            @selectionEvent="selectSynth">
        </MenuElement>
    </div>      
 </div>  
 <div v-else>
    <div class="selector"> {{ drums[selectedSynth]}}
        <MenuElement 
            v-for="(mode,index) in drums"
            class="menu-element"
            :key="index"
            :element="mode"
            @selectionEvent="selectSynth">
        </MenuElement>
    </div>      
 </div>
 
</template>

<script>
import MenuElement from '@/components/MenuElement.vue'

export default {
    name: 'SynthSelector',

    components: {
        MenuElement
    },

    props: ['selectedSynth','id'],

    data() {
        return {
            synths: this.$store.state.synth_names,
            drums: this.$store.state.drum_names,
        }
    },

    methods: {
        selectSynth(element) {
            if(this.id!=3)
            this.$emit('instrumentSelectorEvent', this.synths.indexOf(element))
            else
            this.$emit('instrumentSelectorEvent', this.drums.indexOf(element))
        }
    }
}
</script>

