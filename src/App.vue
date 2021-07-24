<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <sidebar></sidebar>
        </div>
        <div class="col-md-8">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from './components/sidebar.vue'
export default {
  name: 'App',
  components: {
    sidebar
  }
}
</script>

<style lang="scss">
@import "./assets/stylesheets/all.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
