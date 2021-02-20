<template>
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
  <v-card
    v-if="open"
    class="sidepanel"
    :class="{ 'sidepanel-collapse': sidePanelCollapse }"
    dark
  >
    <v-card-title>
      <h2>Create Marker</h2>
    </v-card-title>
    <v-card-text>
      <v-form v-model="formValidity">
        <v-text-field
          readonly
          label="Latitude"
          v-model="coords.lat"
          :rules="latRules"
        />
        <v-text-field
          readonly
          label="Longitude"
          v-model="coords.lng"
          :rules="lngRules"
        />
        <v-file-input
          accept="image/*"
          label="Image"
          prepend-icon="mdi-camera"
          @change="onFileSelected"
          :rules="imageRules"
        ></v-file-input>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="mx-auto"
        @click.prevent="submitMarker"
        color="success"
        :disabled="!formValidity"
        >Create</v-btn
      >
    </v-card-actions>
    <div class="toggle-button-container">
      <v-btn min-width="23" height="48" @click="$emit('collapse-side-panel')">
        <v-icon dark>
          mdi-minus
        </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import MarkerService from '../services/MarkerService';

export default {
  name: 'SidePanel',
  props: {
    coords: Object,
    sidePanelCollapse: Boolean,
  },
  data() {
    return {
      open: true,
      selectedFile: '',
      latRules: [(value) => !!value || 'Latitude is required'],
      lngRules: [(value) => !!value || 'Longitude is required'],
      imageRules: [(value) => !!value || 'You must select an image'],
      formValidity: false,
    };
  },
  methods: {
    ...mapActions(['getMarkers']),
    async submitMarker() {
      await MarkerService.addMarker({
        lat: this.coords.lat,
        lng: this.coords.lng,
        file: this.selectedFile,
      });
      this.getMarkers();
      this.$emit('collapse-side-panel');
    },
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
  width: 400px;
  background-color: rgba($color: #242424, $alpha: 0.8);
  transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.sidepanel-collapse {
  transform: translateX(-400px);
}

.toggle-button-container {
  position: absolute;
  top: 8px;
  left: 100%;
}
</style>
