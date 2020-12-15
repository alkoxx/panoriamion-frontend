<template>
  <div id="app">
    <v-app>
      <gmap-map
        ref="gmap"
        :center="center"
        :zoom="5"
        map-type-id="hybrid"
        class="gmap"
        @click="loadCoord($event)"
      >
        <gmap-marker
          v-for="(marker, i) in markers"
          :key="i"
          :position="marker.position"
          :clickable="true"
          @click="onMarkerSelected(marker)"
        ></gmap-marker>

        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <info-card v-if="selectedMarker" :marker="selectedMarker"></info-card>
        </gmap-info-window>

        <template v-slot:visible>
          <v-row>
            <v-col cols="2">
              <side-panel :coords="coords"></side-panel>
              <v-btn @click.stop="dialog = !dialog">Dialog!!</v-btn>
            </v-col>
            <v-col cols="10">
              <v-dialog v-model="dialog">
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn dark text @click="dialog = false">
                        Save
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </template>
      </gmap-map>
    </v-app>
  </div>
</template>

<script>
import infoCard from "./components/info-card";
import sidePanel from "./components/side-panel";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    infoCard,
    sidePanel,
  },
  data() {
    return {
      center: { lat: 43.0, lng: -2.0 },
      coords: {
        lat: "",
        lng: "",
      },
      selectedMarker: null,
      infoWindowPos: null,
      infoWinOpen: false,
      currentMarkerId: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      dialog: false,
    };
  },
  created() {
    this.$store.dispatch("getMarkers");
  },
  computed: {
    ...mapState(["markers"]),
  },
  methods: {
    loadCoord(event) {
      this.coords.lat = event.latLng.lat();
      this.coords.lng = event.latLng.lng();
    },
    onMarkerSelected(marker) {
      this.selectedMarker = marker;
      this.$refs.gmap.panTo(marker.position);
      this.toggleInfoWindow(marker);
    },
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      if (this.currentMarkerId == marker.id) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMarkerId = marker.id;
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
}
.gmap {
  height: 100vh;
}

.carousel {
  width: 500px;
  height: 800px;
}
</style>
