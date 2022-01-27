<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/main">Play</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cee5ff;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #cee5ff;

    &.router-link-exact-active {
      color: #5cdaa1;
    }
  }
}
</style>
