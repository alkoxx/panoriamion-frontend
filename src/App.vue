<template>
  <div id="app">
    <GmapMap
      :center="center"
      :zoom="5"
      map-type-id="hybrid"
      style="position:absolute; top:0; left:0; bottom:0; width:100%; z-index:-1; "
      @click="loadCoord($event)"
    >

      <gmap-marker v-for="(marker, index) in markers" :key="index" 
        :position="marker.position" :clickable="true" :draggable="true"
        @click="onMarkerSelected(marker)"></gmap-marker>

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" 
        @closeclick="infoWinOpen=false">        
      </gmap-info-window>

      <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
    
      <template v-slot:visible>
        <div style="position:absolute; top:0; left:0; width:400px; height:100vh; background:rgba(0, 0, 0, 0.3); padding:10px">
          
          <form enctype="multipart/form-data">
            <input type="text" placeholder="Latitude" v-model="form.lat">
            <input type="text" placeholder="Longitude" v-model="form.lng">
            <input type="file" @change="onFileSelected" />

            <button @click.prevent="submitMarker">Add Marker</button>
          </form>

          <img v-if="imgUrl" :src="imgUrl" alt="" width="100%" height="300">
          
        </div>      
      </template>    
    </GmapMap>

  </div>
</template>

<script>
import { fetchMarkers } from './services/markers-services'
import { addMarker } from './services/markers-services'

const serverUrl = 'http://127.0.0.1:8000'

export default {
  name: 'App',
  data(){
    return {
      center: {lat:43.0, lng:-2.0},
      markers: [],
      form: {
        lat: '',
        lng: '',
        selectedFile: ''
      },
      imgUrl: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMarkerId: null,
      infoOptions: {
        content: '',
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
    }
  },
  created(){
      this.getMarkers();
  },
  methods: {
    loadCoord(event){
      this.form.lat = event.latLng.lat()
      this.form.lng = event.latLng.lng()
    },
    async getMarkers(){
      this.markers = await fetchMarkers(serverUrl + '/api/markers')
    },
    submitMarker(){
      addMarker(serverUrl + '/marker/add-marker', this.form)
      this.getMarkers()
    },
    onFileSelected(event){
      this.form.selectedFile = event.target.files[0];
    },
    onMarkerSelected(marker){
      console.log(marker.position)
      //this.center=marker.position
      //  this.toggleInfoWindow(marker)
    },  
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = '<div> Hola Hola Hola!!</div>';

      if (this.currentMarkerId == marker.id) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMarkerId = marker.id;
      }
    }
  }
    
}
</script>

<style>
</style>
