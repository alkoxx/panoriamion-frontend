<template>
  <div id="app">
    <GmapMap
      :center="center"
      :zoom="5"
      map-type-id="terrain"
      style="position:absolute; top:0; left:0; bottom:0; width:100%; z-index:-1; "
      @click="loadCoord($event)"
    >

      <gmap-marker v-for="(m, index) in markers" :key="index" 
        :position="m.position" :clickable="true" :draggable="true"
        @click="center=m.position"></gmap-marker>

      <template v-slot:visible>
        <div style="position:absolute; top:0; left:0; width:400px; height:100vh; background:rgba(0, 0, 0, 0.3); padding:10px">
          
          <form enctype="multipart/form-data">
            <input type="text" placeholder="Latitude" v-model="form.lat">
            <input type="text" placeholder="Longitude" v-model="form.lng">
            <input type="file" @change="onFileSelected" />

            <button @click.prevent="submitMarker">Add Marker</button>
          </form>
          
        </div>      
      </template>    
    </GmapMap>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return {
      center: {lat:43.0, lng:-2.0},
      markers: [],
      form: {
        lat: '',
        lng: ''
      },
      selectedFile: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    }
  },
  methods: {
    loadCoord(event){
      this.form.lat = event.latLng.lat()
      this.form.lng = event.latLng.lng()
    },
    async submitMarker(){
      const fd = new FormData();
      fd.append('image', this.selectedFile)
      fd.append('lat', this.lat)
      fd.append('lng', this.lng)
      try{
        await axios.post('http://127.0.0.1:8000/markers/add-marker', fd);
      }catch(error){
        console.log(error)
      }
      
      /*
      let markerData = {position: {lat:this.form.lat, lng:this.form.lng}, icon: this.img}
      this.markers.push(markerData)
      */
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
    }
  }
    
}
</script>

<style>
</style>
