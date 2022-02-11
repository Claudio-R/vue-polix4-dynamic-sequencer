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
        <v-switch v-model="darkswitch"></v-switch>
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
      }
    },
    mounted(){
      this.$vuetify.theme.dark = false
    }
  }
</script>
