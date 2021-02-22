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
  <div class="sidepanel" :class="{ 'sidepanel-collapse': sidePanelCollapse }">
    <v-card dark class="pt-5 pb-5">
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
    </v-card>
    <div class="toggle-button-container">
      <v-btn min-width="23" height="48" @click="$emit('collapse-side-panel')">
        <v-icon dark>
          {{ sidePanelCollapse ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
        </v-icon>
      </v-btn>
    </div>
  </div>
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
  },
};
</script>

<style lang="scss" scoped>
.sidepanel {
  position: absolute;
  top: 8px;
  left: 0;
  width: 350px;
  transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.sidepanel-collapse {
  transform: translateX(-350px);
}

.toggle-button-container {
  position: absolute;
  top: 4px;
  left: 100%;
}

.toggle-button-container .v-btn {
  padding: 0;
}
</style>
