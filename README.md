# PoliX4
PoliX4 is a polyrhythmic polyphonic polystrumental (and Politecnico) loop sequencer made with Vue.js.
It allows the user to set completely independent rhythmic structures for 8 selectable instruments and 3 drum sets.

## Authors
- Andrea De Fabritiis
- Claudio Rapisarda
- Marco Cafaro
- Riccardo Sebastiani Croce

The application has been deployed on the [Heroku](https://www.heroku.com/platform) platform and it's already available [here](https://polix4.herokuapp.com/#/)!

# What is the PoliX4 project?
This is the result of the joint work of four students aiming to create a dynamic instruments which ensures the user maximum freedom in the creation of rhytmic and melodic patterns. Each rhythmic structure is represented by a keyboard whose scale and tonality can be indipendently (and also jointly) programmed. Up to 3 instruments (2 synths and 1 drum set) can be selected and played within each keyboard and the number of keys can be choosen by the user. 
Last but not least, tempo, octave and number of layers and number of bars can be dynamically modified by the user to ensure great live performaces.


# How was it developed?
Such a complex system put us in front of several difficulties which would not have been easily overcome without the help of such a powerful tool as [Vue.js](https://vuejs.org/).
Vue is a JavaScript framework enabling frontend developers to create amazing users interfaces through a declarative and component-based programming model. 
Its core feature is the declarative rendering of HTML custom and reactive components, whose output is based on JavaScript state. State changes for each component are tracked and used to efficiently update the elements in the DOM.

## Dependencies

### Vuetify
The most captivating part of PoliX4 is its fully responsive design which makes it playable on any device and screen size.
This responsive interface was made thanks to the [Vuetify](https://vuetifyjs.com/en/) framework, a Vue library providing developers with a huge collection of Material Components and tools for designing their fully responsive application.

### Vuex

### Tone

### Router


# Project setup

Run npm install in the local folder where you cloned the project to install all the necessary dependecies listed in package.json file.
```
$ npm install
```

### Compiles and hot-reloads for development
```
$ npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Instructions
## Create your first pattern!
### Open your application
As you click on the Play button in the landing page you will be redirect to the PoliX4 sequencer. 
If you are using your phone, rotate it horizzontally to open up the full functionalities of the application. 

### Create a new keyboard
To create your first pattern first click on "remove" at the left side of each keyboard to clean up your application, then, in the left corner you will see an input element which allows you to add new layers. Select the number of keys you wish (from 1 to 12) and click on the plus icon to add your new layer. If 12 keys are not enough for what is in your mind, click on the bars counter in the top right corner to add a new bar, and create structures made of up to 48 elements!

### Keyboard setup
The Menu on the right corner will allow you to select the octave, the key and the scale to use. These settings will apply to all the layers you will create, unless you unmerge the controls by clicking on the unmerge button (see the following). 
Use the BPM selector in the top left corner to select the tempo.

### Choose your instrument
In the center of the toolbar the name of the current instrument is displayed. Click on the name to open the Instrument Menu and set up your 3 instruments. For the first 2 instruments you can select the volume and the duration of the note, while for the drum sets it is only possible to select the volume.

Open the Instrument Menu and click on the Select buttons to switch among the 3 instruments at any time. If you want to choose the type of instruments click on the instrument name and select the instrument that you prefer, but beware that this will affect not only the future notes you will set up, but also the notes that are already present on each keyboards. 

### Make it sound!
Now that everything has been set up, you are ready to play! To program you keyboard click on the keys and and they will be marked according to the instrument you selected: a red or blue pointer will appear for instruments 1 and 2 respectively, while for the drums it will be the background of the key to change color and became green as it is activated.

On the left of each keybord you will see the notes corresponding to each row of keys, according to the tonality and scale you selected (beware that these labels will disappear if you rotate your phone back to vertical).

Once you successfully programmed your rhythmic structure, use the button in the toolbar to make the PoliX4 play your pattern and listen to the music you have made! In the toolbar you will find also the buttons for stop, clear and mute the sequencer, and to disable the automatic scroll among bars.

## Advanced use of PoliX4
### Unmerged controls
You may have noticed that Unmerge button at the center of the toolbar. 
This little button allows you to split the main controller thus unleashing the full power of PoliX4. 

With separate controls for each layer you will be able to create completely independent melodic structures in terms of octave, tonality and scale, and you will also be able to modify the length of the keyboard (while the sequencer is not playing) using the plus and minus buttons.
Besides, using the buttons at the bottom you will be able to disable the prelistening function when you activate a key, mute and clear the single layer.

It is always to come back to the unique controller, but beware that any interaction with the menu will have effect on each layer.

### Beat controller
Another key function for great experiences is the small menu at the bottom of each column of keys. It contains a button for listening to the whole beat, a button for muting the single beat and a function to clear it. When the number of beats is too high for a correct visualization, the menu is collapsed and can be opened on a click.

# Legal Notices

This project is not intended for redistribution or commercial use by anyone except the authors.
