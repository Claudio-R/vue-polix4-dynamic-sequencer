<template>
  <v-card dense outlined class="secondary pa-1" style="opacity: 1; box-shadow: none;">
    <v-row no-gutters>
      <v-col cols="2"  v-for="note in keys" :key="note">
      <v-btn
        text block color="black"
        @click="() => {$emit('keySelectedEvent', note)}"
      >{{note}}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
    name: 'KeySelector',

    props: ['selectedKey'],

    data() {
        return {
            keys: ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'],
        }
    },

    methods: {
        selectKey(note) {
            this.$emit('keySelectedEvent', note)
        }
    }
}
</script>
