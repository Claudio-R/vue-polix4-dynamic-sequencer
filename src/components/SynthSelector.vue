<template>
  <!-- SYNTHS -->
  <div v-if="id!=3">
    <v-menu offset-y :close-on-content-click="true">
      <template v-slot:activator="{ on }">
        <v-btn outlined class="mt-2" block v-on="on">
          <span class="caption">{{synths[selectedSynth]}}</span>
        </v-btn>
      </template>
      <v-card dense outlined class="pa-1">
        <v-row no-gutters>
          <v-col cols="3"  v-for="synth in synths" :key="synth">
            <v-btn
              text block color="primary"
              @click="() => {selectSynth(synth)}"
            >{{synth}}</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>     
  </div>  
  <!-- DRUMS -->
  <div v-else>
    <v-menu offset-y :close-on-content-click="true">
      <template v-slot:activator="{ on }">
        <v-btn outlined class="mt-2" block v-on="on">
          <span class="caption">{{drums[selectedSynth]}}</span>
        </v-btn>
      </template>
      <v-card dense outlined class="pa-1">
        <v-row no-gutters>
          <v-col cols="12"  v-for="drum in drums" :key="drum">
            <v-btn
              text block color="primary"
              @click="() => {selectSynth(drum)}"
            >{{drum}}</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>    
  </div>
  
</template>

<script>
// import MenuElement from '@/components/MenuElement.vue'

export default {
    name: 'SynthSelector',

    // components: {
    //     MenuElement
    // },

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

