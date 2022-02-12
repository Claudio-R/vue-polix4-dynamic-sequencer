<template>
  <!-- SYNTHS -->
  <div v-if="id!=2">
    <v-menu :close-on-content-click="true"
      offset-y
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn outlined class="mt-2" block v-on="on">
          <span class="caption hidden-xs-only text-truncate" style="max-width: 50px;">{{synths[selectedSynth]}}</span>
          <span class="caption hidden-sm-and-up">{{synths[selectedSynth]}}</span>
        </v-btn>
      </template>
      <v-card dense outlined class="pa-1">
        <v-row no-gutters>
          <v-col cols="12" sm="6"  v-for="synth in synths" :key="`${synth}-selector-${id}`">
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
    <v-menu :close-on-content-click="true"
      offset-y
      origin="center center"
      transition="scale-transition"
    >
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

export default {
    name: 'SynthSelector',

    props: ['selectedSynth','id'],

    data() {
        return {
            synths: this.$store.state.synth_names,
            drums: this.$store.state.drum_names,
        }
    },

    methods: {
        selectSynth(element) {
          if(this.id!=2)
          this.$emit('instrumentSelectorEvent', this.synths.indexOf(element))
          else
          this.$emit('instrumentSelectorEvent', this.drums.indexOf(element))
        }
    }
}
</script>

