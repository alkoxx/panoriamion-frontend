<template>
  <div id="app">
    <gmap-map
      ref="gmap"
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
        <info-card :marker="selectedMarker"></info-card>
      </gmap-info-window>

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
    </gmap-map>

  </div>
</template>

<script>
import { fetchMarkers } from './services/markers-services'
import { addMarker } from './services/markers-services'
import infoCard from './components/info-card'

const serverUrl = 'http://127.0.0.1:8000'

export default {
  name: 'App',
  components: {
    infoCard,
  },
  data(){
    return {
      center: {lat:43.0, lng:-2.0},
      markers: [],
      form: {
        lat: '',
        lng: '',
        selectedFile: ''
      },
      selectedMarker: null,
      imgUrl: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMarkerId: null,
      infoOptions: {
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
      this.selectedMarker = marker
      this.$refs.gmap.panTo(marker.position);
      this.toggleInfoWindow(marker)
    },
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
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
