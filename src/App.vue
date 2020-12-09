<template>
  <div id="app">
    <gmap-map
      ref="gmap"
      :center="center"
      :zoom="5"
      map-type-id="hybrid"
      style="position:absolute; top:0; left:0; bottom:0; width:100%; z-index:-1;"
      @click="loadCoord($event)"
    >

      <gmap-marker v-for="(marker, index) in markers" :key="index" 
        :position="marker.position" :clickable="true"
        @click="onMarkerSelected(marker)"></gmap-marker>

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" 
        @closeclick="infoWinOpen=false">
        <info-card v-if="selectedMarker" :marker="selectedMarker"></info-card>
      </gmap-info-window>

      <template v-slot:visible>
        <side-panel :coords="coords"></side-panel>
      </template>
    </gmap-map>

  </div>
</template>

<script>
import { fetchMarkers } from './services/markers-services'
import { addMarker } from './services/markers-services'
import infoCard from './components/info-card'
import sidePanel from './components/side-panel'

const serverUrl = 'http://127.0.0.1:8000'

export default {
  name: 'App',
  components: {
    infoCard,
    sidePanel,
  },
  data(){
    return {
      center: {lat:43.0, lng:-2.0},
      markers: [],
      coords: {
        lat: '',
        lng: ''
      },
      selectedMarker: null,
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
      this.coords.lat = event.latLng.lat()
      this.coords.lng = event.latLng.lng()
    },
    async getMarkers(){
      this.markers = await fetchMarkers(serverUrl + '/api/markers')
    },
    submitMarker(){
      addMarker(serverUrl + '/marker/add-marker', this.form)
      this.getMarkers()
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
