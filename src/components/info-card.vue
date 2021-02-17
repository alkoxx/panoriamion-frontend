<template>
  <v-card class="info-card">
    <v-img
      width="300"
      :src="'http://127.0.0.1:8000/api/markers/' + marker.id + '/file'"
    >
    </v-img>
    <v-card-title>Info</v-card-title>
    <v-card-text>{{ marker.description }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    marker: Object,
  },
};
</script>

<style>
.info-card {
  margin: 10px 0;
}
</style>
