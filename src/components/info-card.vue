<template>
  <div>
    <v-card class="info-card">
      <div class="image-container">
        <v-img
          width="300"
          :src="
            process.env.VUE_APP_API_URL + '/api/markers/' + marker.id + '/file'
          "
          @click="$emit('load-dialog')"
        >
        </v-img>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon small @click.stop="confirmDialog = true">mdi-delete</v-icon>
      </v-card-actions>
      <v-card-title>Info</v-card-title>
      <v-card-text>{{ marker.description }}</v-card-text>
    </v-card>
    <v-dialog v-model="confirmDialog" persistent max-width="490">
      <v-card>
        <v-card-title class="headline">
          Remove marker?
        </v-card-title>
        <v-card-text
          >The marker will be removed permanently. Do you want to
          continue?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="removeMarker">
            Accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MarkerService from '../services/MarkerService';

export default {
  name: 'InfoCard',
  data() {
    return {
      confirmDialog: false,
    };
  },
  props: {
    marker: Object,
  },
  methods: {
    ...mapActions(['getMarkers']),
    async removeMarker() {
      this.confirmDialog = false;
      await MarkerService.removeMarker(this.marker.id);
      this.$emit('close-info-window');
      this.getMarkers();
    },
  },
};
</script>

<style>
.info-card {
  position: relative;
  margin: 10px 0;
}

.image-container {
  overflow: hidden;
}

.image-container .v-image {
  transition: transform 0.2s ease-in;
}

.image-container .v-image:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
