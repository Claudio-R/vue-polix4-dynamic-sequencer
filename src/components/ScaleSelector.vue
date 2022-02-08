<template>
  <v-card flat outlined class="pa-1">
    <v-row no-gutters>
      <v-col cols="4" v-for="scale in scales" :key="scale">
      <v-btn  
        text block color="primary"
        @click="() => {$emit('scaleSelectedEvent', scale)}"
      >{{scale}}</v-btn>
      </v-col>
    </v-row>
  </v-card> 
</template>

<script>
// import MenuElement from '@/components/MenuElement.vue'

export default {
    name: 'ScaleSelector',

    // components: {
    //     MenuElement
    // },

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

