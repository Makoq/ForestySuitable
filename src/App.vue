<template>
  <div id="app">
   <Map/>
  </div>
</template>

<script>
import Map from './page/Map.vue'



export default {
  name: 'app',
  components: {
    Map
  }
}
</script>

<style scoped>
 
#app {
     
    height:100%;
    width:100%
     
}
</style>
