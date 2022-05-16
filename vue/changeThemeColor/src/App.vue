<template>
  <div id="app">
    <Theme></Theme>
    <ThemePicker></ThemePicker>
  </div>
</template>

<script>
import Theme from './views/Theme.vue'
import ThemePicker from './components/ThemePicker/index.vue'
export default {
  name: 'App',
  components: {
    Theme,
    ThemePicker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
