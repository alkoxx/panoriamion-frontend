<template>
  <div class="user-status">
    <v-avatar v-if="loggedIn" color="red" size="38">
      <span class="white--text">JA</span>
    </v-avatar>
    <span v-else class="white--text text-h6 px-12">Login</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['loggedIn']),
  },
};
</script>

<style>
.user-status {
  position: absolute;
  top: 10px;
  right: 40px;
}
</style>
