<template>
  <div>
    <!--
    <label>
      AutoComplete
      <gmap-autocomplete
        placeholder="This is a placeholder text"
        @place_changed="setPlace"
        >dsf asdfa ds
      </gmap-autocomplete>
    </label>
    -->
    <transition name="fade">
      <v-card v-if="open" class="sidepanel" dark>
        <v-card-title>
          <h2>Create Marker</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Latitude" v-model="coords.lat" />
            <v-text-field label="Longitude" v-model="coords.lng" />
            <v-file-input
              accept="image/*"
              label="File input"
              @change="onFileSelected"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click.prevent="submitMarker" color="success">Add</v-btn>
        </v-card-actions>
      </v-card>
    </transition>

    <v-btn @click="toggle">Toggle</v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MarkerService from "../services/MarkerService";

export default {
  name: "SidePanel",
  props: {
    coords: Object,
  },
  data() {
    return {
      open: true,
      selectedFile: "",
    };
  },
  methods: {
    ...mapActions(["getMarkers"]),
    submitMarker() {
      console.log(this.selectedFile);
      MarkerService.addMarker({
        lat: this.coords.lat,
        lng: this.coords.lng,
      });

      //MarkerService.addFile(this.selectedFile)
      //MarkerService.addMediaObject(this.selectedFile);
      /*
      MarkerService.addMarker({
        lat: this.coords.lat,
        lng: this.coords.lng,
        selectedFile: this.selectedFile,
      });      
      this.getMarkers();
      */
    },
    //setPlace() {},
    onFileSelected(file) {
      this.selectedFile = file;
    },
    toggleSidePanel() {
      this.open = !this.open;
    },
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidepanel {
  height: calc(100vh - 50px);
  padding-top: 30px;
  max-width: 400px;
  background-color: rgba($color: #242424, $alpha: 0.6);
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
