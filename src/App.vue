<template>
  <div id="app">
    <v-app>
      <auth v-if="!loggedIn"></auth>
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
          <info-card
            v-if="selectedMarker"
            :marker="selectedMarker"
            @load-dialog="dialog = true"
            @close-info-window="infoWinOpen = false"
          ></info-card>
        </gmap-info-window>

        <template v-slot:visible>
          <v-row>
            <v-col cols="2">
              <side-panel :coords="coords"></side-panel>
            </v-col>
            <v-col cols="10">
              <v-dialog v-model="dialog" fullscreen>
                <div class="dialog-close">
                  <v-btn dark icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
                <v-carousel height="100%" dark>
                  <v-carousel-item v-for="(marker, i) in markers" :key="i">
                    <v-img
                      contain
                      height="100%"
                      :src="
                        'http://127.0.0.1:8000/api/markers/' +
                          marker.id +
                          '/file'
                      "
                    ></v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-dialog>
            </v-col>
          </v-row>
        </template>
      </gmap-map>
    </v-app>
  </div>
</template>

<script>
import infoCard from './components/info-card';
import sidePanel from './components/side-panel';
import auth from './components/Auth';

import AuthService from './services/AuthService';

import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    infoCard,
    sidePanel,
    auth,
  },
  data() {
    return {
      center: { lat: 43.0, lng: -2.0 },
      coords: {
        lat: '',
        lng: '',
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
    this.setupInitialState();
  },
  computed: {
    ...mapState(['userId', 'markers', 'loggedIn']),
  },
  methods: {
    ...mapMutations(['resetValues']),
    ...mapActions(['getMarkers']),
    async setupInitialState() {
      if (this.userId) {
        try {
          await AuthService.checkAuthenticated(this.userId);
          this.getMarkers();
        } catch (error) {
          this.resetValues();
        }
      }
    },
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

.dialog-close {
  position: absolute;
  z-index: 1;
  text-align: right;
  padding: 5px 20px;
}
</style>
