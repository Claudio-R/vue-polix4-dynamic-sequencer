<template>
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
        <b>PoliX4</b> is a polyrhythmic polyphonic polystrumental (and Politecnico) loop sequencer made with Vue, with the aid of Vuetify. <br>
        The innovative GUI allows the user to set different rhythmic structures for 8 selectable instruments and 3 drum sets. 
        Each rhythimc structure is represented by a keyboard whose scale and tonality can be individually (and also jointly) programmed.<br>
    </v-card-text>

     <v-card-title>User Manual</v-card-title>

     <v-card-subtitle><h3>Tempo</h3></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="6" class="caption">
            <v-btn depressed class="disable-events" small block>
                    <v-icon left>mdi-metronome-tick</v-icon>
                    <span>BPM: 120</span>
            </v-btn>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        Select tempo for the loop sequencer player. It corresponds to the number of beats per minute of the <b>first layer</b>.
    </v-card-text>
    <v-card-subtitle><h3>Instruments</h3></v-card-subtitle>
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

    <v-card-subtitle><h3>Bars</h3></v-card-subtitle>
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

    <v-card-subtitle><h3>Rhytmic Layers</h3></v-card-subtitle>
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
        Add a new rhythmic layer. Keyboards can be 1 to 12 beats long.
    </v-card-text>

    <v-card-subtitle><h3>Live Performance Controls</h3></v-card-subtitle>
     <v-row :justify="'center'">
        <v-col cols="12" sm="11">
          <v-card>
            <v-row no-gutters class="d-flex align-center">
              <v-col cols="12" sm="8">
                <v-card-actions class="d-flex justify-space-around">
                  <v-btn icon small class="disable-events">
                    <v-icon large>mdi-play</v-icon>
                  </v-btn>
                  <v-btn icon small class="disable-events">
                    <v-icon large>mdi-stop</v-icon>  
                  </v-btn>
                  <v-btn icon small class="disable-events">
                    <v-icon large>mdi-volume-mute</v-icon>
                  </v-btn>
                  <v-btn small depressed color="primary" class="disable-events">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn small depressed class="primary disable-events">
                    <v-icon>mdi-arrow-right-circle-outline</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col sm="4" class="hidden-xs-only">
                <v-card-actions>
                  <v-btn small depressed block class="disable-events">Merge</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
     </v-row>
     <v-card-text class="text-justify">
        In this controls section you can play with PoliX4 in your own way. <br>
        The <b>play</b> button lets you start/restart the sequencing loop. In the other hand the <b>stop</b> button will stop the loop.<br>
        The <b>mute</b> button will mute every beat on the keyboards. Not available when <b>merge</b> is not active. <br>
        The <b>clear</b> button reset all the instrument selections on the keyboards. <br>
        The <b>follow</b> button lets you follow the loop flow across the keyboards while playing. <br>
        The <b>merge</b> button lets you control the scale, tonality and octave of all the existing layers at the same time. 
        When selected, a drop-down menu button will appear on the right, which will allow you to select the octave, the scale and tonality.  <br>
    </v-card-text>
    <v-card-subtitle><h3>Sequencer</h3></v-card-subtitle>
    <v-row justify="center">
      <v-col cols="10">
        <v-img v-if="!this.$vuetify.theme.dark"
              :src="require('../assets/demo.png')"
              class="my-0"
              contain
              large
            />
          <v-img v-else
              :src="require('../assets/demoDark.png')"
              class="my-0"
              contain
              large
            />
      </v-col>
    </v-row>
    <v-card-text class="text-justify">
        The selected instrurment is visualized as a colored dot on the keyboard (or a green button background if you selected a drum kit).<br>
        Each row on the keyboard corresponds to a note (or drum component) visualized on the labels on the left.
        On the right, if <b>merge</b> is not active, additional controllers are available, that act only on the corresponding layer keyboard.<br>
        In this controller section you can:<br> 
        - remove the layer from the sequencer (all instrument selections are not saved!)<br>
        - add beats to the layer keyboard (while not playing)<br>
        - choose a different scale or octave<br>
        - decide if you want to listen to the note when pressed<br>
        - mute the layer<br>
        - clear all the instrument selections for the current layer<br>
    </v-card-text>
    <v-card-subtitle><h3>Authors Notes</h3></v-card-subtitle>
    <v-card-text class="text-justify">
        On extra small devices (or vertical positon on small devices), some controls will not be visualized.
        We made this decision in order to offer a quality service without compromising the GUI appearance.
    </v-card-text>
  </v-card>
</v-container>
</template>

<style scoped>
.disable-events {
  pointer-events: none
}
</style>
