import Vue from 'vue'
import Vuex from 'vuex'
import * as Tone from 'tone'
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

/** Use Tone to create Synth */
const synth1 = new Tone.PolySynth(Tone.AMSynth).toDestination();
synth1.set({
     harmonicity : 1 ,
     detune : 0 ,
     oscillator : {
         type : "sawtooth"
        } ,
        envelope : {
            attack : 0.01 ,
            decay : 0.1 ,
            sustain : 0.3 ,
            release : 0.07
        } ,
        modulation : {
            type : "pulse"
        } ,
        modulationEnvelope : {
            attack : 0.5 ,
            decay : 0 ,
            sustain : 0.5 ,
            release : 0.07
        }
});
const synth2 = new Tone.PolySynth(Tone.DuoSynth).toDestination();
synth2.set({
    vibratoAmount  : 0.5 ,
    vibratoRate  : 5 ,
    harmonicity  : 1.5 ,
    voice0  : {
        volume  : -10 ,
        portamento  : 0 ,
        oscillator  : {
            type  : "pulse"
        }  ,
        filterEnvelope  : {
            attack  : 0.01 ,
            decay  : 0 ,
            sustain  : 0.5 ,
            release  : 0.1
        }  ,
        envelope  : {
            attack  : 0.005 ,
            decay  : 0.1 ,
            sustain  : 0.3 ,
            release  : 0.07
        }
    }  ,
    voice1  : {
        volume  : -10 ,
        portamento  : 0 ,
        oscillator  : {
            type  : "square"
        }  ,
        filterEnvelope  : {
            attack  : 0.01 ,
            decay  : 0 ,
            sustain  : 0.5 ,
            release  : 0.1
        }  ,
        envelope  : {
            attack  : 0.005 ,
            decay  : 0.1 ,
            sustain  : 0.3 ,
            release  : 0.07
        }
    }
});

/** Use Firebase + Tone to retrieve the drum kit */
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const firebaseConfig = {
    apiKey: "AIzaSyB23PkWGtyU3LFIYBy8uiKT0RM9gUYrkXk",
    authDomain: "actam21.firebaseapp.com",
    projectId: "actam21",
    storageBucket: "actam21.appspot.com",
    messagingSenderId: "745216869995",
    appId: "1:745216869995:web:7ad950861a786b73b8d32e",
    measurementId: "G-N1VC6LWMBM"
};

const drum = Array(8);
const path = 'gs://actam21.appspot.com';

getDownloadURL(ref(storage, path + '/808_KICK_01_CLEAN_CFC.wav')).then(function(url) {
    drum[0] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_SNARE_01_CLEAN_CFC.wav')).then(function(url) {
  drum[1] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_TOM_HIGH_CLEAN_CFC.wav')).then(function(url) {
    drum[2] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_TOM_MID_CLEAN_CFC.wav')).then(function(url) {
    drum[3] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_H-CL_CLEAN_CFC.wav')).then(function(url) {
    drum[4] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_H-OH_CLEAN_CFC.wav')).then(function(url) {
    drum[5] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_CYM_01_CLEAN_CFC.wav')).then(function(url) {
    drum[6] = new Tone.Player(url).toDestination(); 
  })
getDownloadURL(ref(storage, path + '/808_COW_CLEAN_CFC.wav')).then(function(url) {
    drum[7] = new Tone.Player(url).toDestination(); 
  })

/** store the instruments using VUEX */
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'synth1' : synth1,
    'synth2' : synth2,
    'drum' : drum,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
