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
          player: '#bcb4ff',
          drum: '#80CBC4'
        },
        dark: {
          primary: '#4a6064',
          secondary: '#749298',
          tertiary: '#3e3b3b',
          fourth: '#59757a',
          five: '#598482',
          anchor: '#8c9eff',
          background: '#647575',
          player: '#7ebab5',
          drum: '#004D40'
        },
      },
    },
})

export default vuetify;