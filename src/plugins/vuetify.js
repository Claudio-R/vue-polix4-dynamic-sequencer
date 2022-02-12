import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#70adc0',
          secondary: '#cae2ea',
          tertiary: '#fcfdfd',
          anchor: '#8c9eff',
          backgroundmain: '#4e5387',
          backgroundhome: '#c81aea',
        },
        dark: {
          primary: '#B0D6E1',
          secondary: '#CAE2EA',
          tertiary: '#4A4646',
          anchor: '#8c9eff',
          backgroundmain: '506D4E',
          backgroundhome: '#c81aea',
        },
      },
    },
})

export default vuetify;
