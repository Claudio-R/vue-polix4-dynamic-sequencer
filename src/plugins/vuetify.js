import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: '#969FC7', //toolbar
          secondary: '#cae2ea', // labels
          tertiary: '#fcfdfd', //tiles
          fourth: '#AFBDF8', //remove layer
          five:'#9FF1F1', //octave
          anchor: '#8c9eff',
          background: '#7E80B7',
          player: '#bcb4ff'
        },
        dark: {
          primary: '#829DA2',
          secondary: '#9AB0B4',
          tertiary: '#4C4949',
          fourth: '#729095',
          five: '73A19F',
          anchor: '#8c9eff',
          background: '#627676',
          player: '#7ebab5'
        },
      },
    },
})

export default vuetify;