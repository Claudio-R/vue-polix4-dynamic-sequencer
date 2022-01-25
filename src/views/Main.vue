<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Sequencer msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Sequencer from '@/components/Sequencer.vue'

export default {
  name: 'Main',
  components: {
    Sequencer
  }
}