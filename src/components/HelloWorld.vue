<template>
  <v-container fluid>
    <v-row class="text-center" no-gutters>
      <v-col cols="12">
        <router-link to="/about">About</router-link>
      </v-col>
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo2.png')"
          class="my-0"
          contain
          height="50vh"
          large
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          elevation="2"
          fab
          height="30vh"
          width="30vh"
          to="/main">
            <span style="font-size: 5vh;">play</span>
          </v-btn>
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
.playbutton{
  background: radial-gradient(50% 50% at 50% 50%, #d3dcf3 0%, rgba(11, 53, 162, 0.3) 100%);
}
.about{
  width: 156px;
  height: 46px;
  background: rgba(196, 196, 196, 0.28);
  font-size: 20px;
  border-radius: 30px;
  color: white;
}
</style>