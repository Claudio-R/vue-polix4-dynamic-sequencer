import Vue from 'vue'
import Vuex from 'vuex'
import * as Tone from 'tone'
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

/** Use Tone to create Synth */
const comp = new Tone.Limiter(-30).toDestination();
const synth = [];

synth[0] = new Tone.PolySynth(Tone.AMSynth).connect(comp);
synth[0].set({
     volume : -2 ,
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

synth[1] = new Tone.PolySynth(Tone.DuoSynth).connect(comp);
synth[1].set({
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
        volume  : 3 ,
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

synth[2] = new Tone.PolySynth(Tone.FMSynth).connect(comp);
synth[2].set({
	"volume": -10,
	"detune": 0,
	"portamento": 0,
	"harmonicity": 3,
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "sine"
	},
	"envelope": {
		"attack": 0.01,
		"attackCurve": "linear",
		"decay": 0.2,
		"decayCurve": "exponential",
		"release": 0.5,
		"releaseCurve": "exponential",
		"sustain": 1
	},
	"modulation": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "square"
	},
	"modulationEnvelope": {
		"attack": 0.2,
		"attackCurve": "linear",
		"decay": 0.01,
		"decayCurve": "exponential",
		"release": 0.5,
		"releaseCurve": "exponential",
		"sustain": 1
	},
	"modulationIndex": 12.22
})
synth[3] = new Tone.PolySynth().connect(comp);
synth[3].set({
	"volume": -10,
	"detune": 0,
	"portamento": 0,
	"envelope": {
		"attack": 0.01,
		"attackCurve": "exponential",
		"decay": 0.1,
		"decayCurve": "exponential",
		"release": 0.4,
		"releaseCurve": "exponential",
		"sustain": 0.5
	},
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "fatsawtooth",
		"count": 3,
		"spread": 30
}})

const reverb = new Tone.JCReverb({
  roomSize: 0.85,
  wet: 0.1
}).toDestination();

const phaser = new Tone.Phaser({
  frequency: 0.06,
  octaves: 3,
  stages: 12,
  Q: 3,
  wet: 0.2,
  baseFrequency: 350
}).toDestination();

synth[4] = new Tone.Sampler({
  urls: {
    A0: "A0.mp3",
    C1: "C1.mp3",
    "D#1": "Ds1.mp3",
    "F#1": "Fs1.mp3",
    A1: "A1.mp3",
    C2: "C2.mp3",
    "D#2": "Ds2.mp3",
    "F#2": "Fs2.mp3",
    A2: "A2.mp3",
    C3: "C3.mp3",
    "D#3": "Ds3.mp3",
    "F#3": "Fs3.mp3",
    A3: "A3.mp3",
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
    C5: "C5.mp3",
    "D#5": "Ds5.mp3",
    "F#5": "Fs5.mp3",
    A5: "A5.mp3",
    C6: "C6.mp3",
    "D#6": "Ds6.mp3",
    "F#6": "Fs6.mp3",
    A6: "A6.mp3",
    C7: "C7.mp3",
    "D#7": "Ds7.mp3",
    "F#7": "Fs7.mp3",
    A7: "A7.mp3",
    C8: "C8.mp3"
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/"
}).chain(phaser, reverb, comp);

synth[5] = new Tone.PolySynth().connect(comp);
synth[5].set({
  "volume" : -10,
  "oscillator": {
      "type": "square8",
      "spread" : 40,
      "count" : 10
  },
  "envelope": {
      "attack": 0.1,
      "decay": 0.01,
      "sustain": 1,
      "attackCurve" : "sine",
      "releaseCurve" : "sine",
      "release": 0.4
  }
})

synth[6] = new Tone.PolySynth(Tone.FMSynth).connect(comp);
synth[6].set({
  "volume" : -10,
  "harmonicity":8,
  "modulationIndex": 2,
  "oscillator" : {
      "type": "sine"
  },
  "envelope": {
      "attack": 0.001,
      "decay": 2,
      "sustain": 0.3,
      "release": 0.5
  },
  "modulation" : {
      "type" : "square"
  },
  "modulationEnvelope" : {
      "attack": 0.002,
      "decay": 0.2,
      "sustain": 0,
      "release": 0.2
  }
})

synth[7] = new Tone.PolySynth().connect(comp);
synth[7].set({
  "volume" : 0,
  "portamento" : 0.0,
  "oscillator": {
      "type": "square4"
  },
  "envelope": {
      "attack": 2,
      "decay": 1,
      "sustain": 0.2,
      "release": 2
  }
})

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

const drum = [];
const path = 'gs://actam21.appspot.com';
{
  /*drumkit #1*/
  getDownloadURL(ref(storage, path + '/TR808/808_KICK_01_CLEAN_CFC.wav')).then(function(url) {
      drum[0] = new Tone.Player(url).connect(comp); /*kick*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_SNARE_01_CLEAN_CFC.wav')).then(function(url) {
      drum[1] = new Tone.Player(url).connect(comp); /*snare*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_TOM_HIGH_CLEAN_CFC.wav')).then(function(url) {
      drum[2] = new Tone.Player(url).connect(comp); /*tom1*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_TOM_MID_CLEAN_CFC.wav')).then(function(url) {
      drum[3] = new Tone.Player(url).connect(comp); /*tom2*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_H-CL_CLEAN_CFC.wav')).then(function(url) {
      drum[4] = new Tone.Player(url).connect(comp); /*hh close*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_H-OH_CLEAN_CFC.wav')).then(function(url) {
      drum[5] = new Tone.Player(url).connect(comp); /*hh open*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_CYM_01_CLEAN_CFC.wav')).then(function(url) {
      drum[6] = new Tone.Player(url).connect(comp); /*ride*/
    })
  getDownloadURL(ref(storage, path + '/TR808/808_CLAP_01_CLEAN_CFC.wav')).then(function(url) {
      drum[7] = new Tone.Player(url).connect(comp); /*clap*/
    })

  /*drumkit #2*/
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_kick_01.wav')).then(function(url) {
    drum[8] = new Tone.Player(url).connect(comp); /*kick*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_snare_01.wav')).then(function(url) {
    drum[9] = new Tone.Player(url).connect(comp); /*snare*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_tom_01.wav')).then(function(url) {
    drum[10] = new Tone.Player(url).connect(comp); /*tom1*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_tom_02.wav')).then(function(url) {
    drum[11] = new Tone.Player(url).connect(comp); /*tom2*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_closedhat_01.wav')).then(function(url) {
    drum[12] = new Tone.Player(url).connect(comp); /*hh close*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_openhat_01.wav')).then(function(url) {
    drum[13] = new Tone.Player(url).connect(comp); /*hh open*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_ride_01.wav')).then(function(url) {
    drum[14] = new Tone.Player(url).connect(comp); /*ride*/
  })
  getDownloadURL(ref(storage, path + '/TR909/SampleMagic_tr909_clap.wav')).then(function(url) {
    drum[15] = new Tone.Player(url).connect(comp); /*clap*/
  })
  /*drumkit #3*/

  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Voyage - Kick 01.wav')).then(function(url) {
    drum[16] = new Tone.Player(url).connect(comp); /*kick*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Synthwave - Snare - 01.wav')).then(function(url) {
    drum[17] = new Tone.Player(url).connect(comp); /*snare*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Voyage - Tom 01.wav')).then(function(url) {
    drum[18] = new Tone.Player(url).connect(comp); /*tom1*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Synthwave - Tom - 10.wav')).then(function(url) {
    drum[19] = new Tone.Player(url).connect(comp); /*tom2*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Synthwave - Closed Hat - 01.wav')).then(function(url) {
    drum[20] = new Tone.Player(url).connect(comp); /*hh close*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Synthwave - Open Hat - 03.wav')).then(function(url) {
    drum[21] = new Tone.Player(url).connect(comp); /*hh open*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Synthwave - Ride - 17.wav')).then(function(url) {
    drum[22] = new Tone.Player(url).connect(comp); /*ride*/
  })
  getDownloadURL(ref(storage, path + '/VAPORWAVE/BVKER - Synthwave - Clap - 12.wav')).then(function(url) {
    drum[23] = new Tone.Player(url).connect(comp); /*clap*/
  })
}

/*synth names and initial selections*/
const synth_names = ['Pulsequare','Pulsaw','FM','Halen','GrandPiano','Alien','AmericanBeauty','Delicatissimo']
const drum_names = ['TR-808', 'TR-909','Vaporwave']
const synth_selection = [1,3,0]

/** store the instruments using VUEX */
Vue.use(Vuex)

/* store the dark/light switch mode */
const darkswitch = false

export default new Vuex.Store({
  state: {
    'synth_selection' : synth_selection,
    'synth1' : synth[synth_selection[0]],
    'synth2' : synth[synth_selection[1]],
    'synth_names' : synth_names,
    'drum' : drum,
    'drum_names' : drum_names,
    'darkswitch' : darkswitch
  },
  mutations: {
    synthsChanged(state){
        state.synth1 = synth[synth_selection[0]]
        state.synth2 = synth[synth_selection[1]]
        state.drum = drum.slice(synth_selection[2]*8,(synth_selection[2]+1)*8)
    }
  },
  actions: {
  },
  modules: {
  }
})
