<template>
  <div class="home">
    <Sequencer></Sequencer>
  </div>
</template>

<script>
import Sequencer from '@/components/Sequencer.vue'

export default {
  name: 'MainPage',
  components: {
    Sequencer
  }
}
</script>

<style lang="scss">
  #app{
    background-color: rgb(19, 109, 116);
  }
</style>