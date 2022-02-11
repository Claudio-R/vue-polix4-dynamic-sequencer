-<template>
<v-container>
    <v-btn
        style="position:absolute;"
          elevation="2"
          fab
          small
          to="/">
            <v-icon >mdi-arrow-left</v-icon>
    </v-btn>
  <v-card 
    class="about mx-auto ma-15"
    width="75%"
    >
    <v-card-title><h1>PoliX4</h1></v-card-title>
    <v-card-text class="text-justify">
        <b>PoliX4</b> is a polyrhythmic polyphonic polystrumental (and Politecnico) loop sequencer made with Vue, with the aid of Vuetify and Cordova frameworks. <br>
        The innovative GUI allow the user to set different rythmic structures for 10 selectable instruments and 3 drum sets. 
        Each rythimc structure is represented by a keyboard whose scale and scale key can be individually (and also jointly) programmed.<br>
    </v-card-text>

     <v-card-subtitle><h3>Manual</h3></v-card-subtitle>

     <v-card-subtitle><h4>Tempo</h4></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="6" class="caption">
            <v-btn depressed class="disable-events" small block>
                    <v-icon left>mdi-metronome-tick</v-icon>
                    <span>BPM: 120</span>
            </v-btn>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        Select tempo for the loop sequencer player. It corresponds to the number of beats of <b>the first layer</b> per minute.
    </v-card-text>
    <v-card-subtitle><h4>Instruments</h4></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="6" class="caption">
            <v-btn depressed class="disable-events red--text" small block>
                    <v-icon left>mdi-guitar-electric</v-icon>
                    <span>Halen</span>
            </v-btn>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        Choose up to 8 instruments and 3 drumsets to use in your performance. Only two synths and one drumset can be played at a time.
        Other controls such as volume and note duration are settable.
    </v-card-text>

    <v-card-subtitle><h4>Bars</h4></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="6" class="caption">
            <v-btn depressed class="disable-events" small block>
                    <span>Bars: 2</span>
            </v-btn>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        Choose how many measures are present in a single loop. It can be setted anytime. 
    </v-card-text>

    <v-card-subtitle><h4>Layer keyboards</h4></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="6" class="caption">
            <v-card>
            <v-card-actions>
              <v-text-field type="number" 
                label="Add a layer"
                outlined dense
                class="disable-events"
                hint="Value from 1 to 12"
                hide-details="true"
                append-outer-icon="mdi-plus-circle"
              ></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        Add a rythmic layer keyboard. Keyboards can be 1 to 12 beats long.
    </v-card-text>

    <v-card-subtitle><h4>Live Performance Controls</h4></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="9">
          <v-card>
            <v-row no-gutters class="d-flex align-center">
              <v-col cols="12" sm="8">
                <v-card-actions class="d-flex justify-space-around">
                  <v-btn icon outlined color="secondary" class="disable-events">
                    <v-icon >mdi-play</v-icon>
                  </v-btn>
                  <v-btn icon outlined color="secondary" class="disable-events">
                    <v-icon >mdi-stop</v-icon>  
                  </v-btn>
                  <v-btn icon outlined color="secondary" class="disable-events">
                    <v-icon>mdi-volume-mute</v-icon>
                  </v-btn>
                  <v-btn small depressed color="secondary" class="disable-events">
                    <v-icon >mdi-delete</v-icon>
                  </v-btn>
                  <v-btn small depressed class="disable-events">
                    <v-icon>mdi-arrow-right-circle-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col sm="4" class="hidden-xs-only">
                <v-card-actions>
                  <v-btn small depressed block class="disable-events">Unmerge</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        In this controls section you can play with PoliX4 in your own way. <br>
        The <b>play</b> button lets you start/restart the sequencing loop. In the other hand the <b>stop</b> button will stop the loop.<br>
        The <b>mute</b> button will mute every beat on the keyboards. Not available when <b>merge</b> is active. <br>
        The <b>clear</b> button reset all the instrument selections on the keyboards. <br>
        The <b>follow</b> button lets you follow the loop flow across the keyboards while playing. <br>
        The <b>merge</b> button lets you control the scale, key scale and octave of all the existing layers at the same time. 
        When selected, a drop-down menu button will appear on the right.  <br>
    </v-card-text>

  </v-card>
</v-container>
</template>

<style scoped>
.disable-events {
  pointer-events: none
}
</style>