<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">User Info</h1>
    </v-card-title>
    <v-card-text></v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="logout">
        Logout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AuthService from '../services/AuthService';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapMutations(['setLoggedIn']),
    ...mapActions(['getMarkers']),
    async logout() {
      await AuthService.logout();
      this.setLoggedIn(false);
      this.getMarkers();
      this.$emit('toggleUserInfo');
    },
  },
};
</script>

<style></style>
