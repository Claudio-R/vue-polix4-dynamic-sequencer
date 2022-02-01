<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-switch
        class="mt-4"
        inset
        color="grey lighten-4"
        append-icon="mdi-brightness-6"
        v-model="$vuetify.theme.dark"
      ></v-switch>
    </v-app-bar>

     <v-navigation-drawer v-model="drawer"
        absolute
        bottom
        temporary
      >
        <v-list nav>
          <v-list-item-group>
            <v-list-item>
              <router-link class="title" to="/">Home</router-link>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <router-link class="title" to="/about">About</router-link>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <router-link class="title" to="/main">Play</router-link>
            </v-list-item>
            <v-divider></v-divider>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0f2742;
}

#nav {
  a {
    font-weight: bold;
    color: #2b4563;
    &.router-link-exact-active {
      color: #35a372;
    }
  }
}
</style>
