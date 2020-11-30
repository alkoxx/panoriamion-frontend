<template>
  <div id="app">
    <GmapMap
      :center="{lat:43.0, lng:-2.0}"
      :zoom="5"
      map-type-id="terrain"
      style="position:absolute; top:0; left:0; bottom:0; width:100%; z-index:-1; "
      @click="mensaje($event)"
    >

      <gmap-marker :position="{lat: 43.0,lng: -2.0}" :clickable="true" :draggable="true" @click="mensaje()"></gmap-marker>

      <template v-slot:visible>
        <div style="position:absolute; top:0; left:0; width:400px; height:100vh; background:rgba(0, 0, 0, 0.3); padding:10px">
          
          <form enctype="multipart/form-data">
            <input type="text" placeholder="Latitude" v-model="lat">
            <input type="text" placeholder="Longitude" v-model="lng">
            <button @click.prevent="submit">Añadir imagen</button>
          </form>
          
        </div>      
      </template>    
    </GmapMap>

  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      form: {
        lat: '',
        lng: ''
      }
    }
  }
}
</script>

<style>
</style>
