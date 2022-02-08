<template>
  <v-card dense outlined class="pa-1">
    <v-row no-gutters>
      <v-col cols="2"  v-for="note in keys" :key="note">
      <v-btn
        text block color="primary"
        @click="() => {$emit('keySelectedEvent', note)}"
      >{{note}}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import MenuElement from '@/components/MenuElement.vue'

export default {
    name: 'KeySelector',

    // components: {
    //     MenuElement
    // },

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
