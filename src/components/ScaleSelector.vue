<template>
    <div class="selector"> {{ selectedScale }}
        <MenuElement 
            v-for="(mode,index) in scales"
            class="menu-element"
            :key="index"
            :element="mode"
            @selectionEvent="selectScale">
        </MenuElement>
    </div>  
</template>

<script>
import MenuElement from '@/components/MenuElement.vue'

export default {
    name: 'ScaleSelector',

    components: {
        MenuElement
    },

    props: ['selectedScale'],

    data() {
        return {
            //selectedScale: 'Major',
            scales: ['Major','Minor','Melodic Minor','Harmonic Minor','Diminished','Augmented','Hexatonic'],
        }
    },

    methods: {
        selectScale(scale) {
            //this.selectedScale = scale;
            this.$emit('scaleSelectedEvent', scale)
        }
    }
}
</script>

