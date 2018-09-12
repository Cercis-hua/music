<template>
  <div id="app">
    <!--<router-view/>-->
    <m-header></m-header>
  </div>
</template>

<script>
  import  MHeader from 'components/m-header/m-header'
  export default {
    components: {
        MHeader
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
