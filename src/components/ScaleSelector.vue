<template>
  <v-card flat outlined class="secondary pa-1" style="opacity: 1; box-shadow: none;">
    <v-row no-gutters>
      <v-col cols="6" md="4" v-for="scale in scales" :key="scale">
      <v-btn  
        text block color="black"
        @click="() => {$emit('scaleSelectedEvent', scale)}"
      >{{scale}}</v-btn>
      </v-col>
    </v-row>
  </v-card> 
</template>

<script>


export default {
    name: 'ScaleSelector',

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

