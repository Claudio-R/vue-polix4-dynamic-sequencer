<template>
  <v-container fluid>
    <v-row class="text-center" no-gutters>
      <v-col cols="2" offset="5" align-self="center">
        <v-btn
          elevation="2"
          fab
          height="48px"
          width="156px"
          to="/about"
          text block color="black"
          :src="require('../assets/ellipse.png')"
          style="top:5vh; margin-left: auto; margin-right: auto;">
            <span style="display: block; font-size: 2vh;">About</span>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo2.png')"
          class="my-0"
          contain
          height="50vh"
          width="50vh"
          style="display: block;top:15%;margin-left: auto; margin-right: auto; background: rgba(196, 196, 196, 0.28);"
          large
        />
      </v-col>
      <v-col cols="12">
        <v-card
          class="tertiary rounded-circle"
          height="20vh"
          width="20vh"
          style="opacity:0.2;display:block; margin-left: auto; margin-right:auto;">
            <v-btn
              elevation="2"
              fab
              height="20vh"
              width="20vh"
              to="/main"
              text block color="black"
              style="background: radial-gradient(50% 50% at 25.28% 94.35%, #D9E1F7 0%, rgba(11, 53, 162, 0.3) 100%);">
                <span style="font-size: 5vh;">play</span>
            </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-switch v-model="darkswitch" 
        style="position: absolute; bottom:0;">
        <template v-slot:label>
          <span v-if="!darkswitch">Theme: light</span>
          <span v-else>Theme: dark</span>
        </template>
        </v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
        darkswitch: false,
    }),
    watch: {
      'darkswitch': function(val) {
          this.$vuetify.theme.dark = this.darkswitch
          this.$store.darkswitch = this.darkswitch
      }
    },
    mounted(){
      this.$vuetify.theme.dark = this.$store.darkswitch
      this.darkswitch = this.$store.darkswitch
    }
  }
</script>
<style lang="scss">
</style>