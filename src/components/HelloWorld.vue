<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="40vh"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          elevation="2"
          fab
          height="20vh"
          width="20vh"
        >play</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      
    }),
  }
</script>
