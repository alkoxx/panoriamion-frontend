<template>
  <div>
    <div class="user-status" @click="$emit('toggleUserInfo')">
      <v-avatar v-if="loggedIn" color="red" size="38">
        <span class="white--text">JA</span>
      </v-avatar>
      <v-btn v-else color="info">
        Login
      </v-btn>
    </div>

    <div v-if="userInfoOpen" class="info-container">
      <auth v-if="!loggedIn" @toggleUserInfo="$emit('toggleUserInfo')"></auth>
      <user-info v-else @toggleUserInfo="$emit('toggleUserInfo')"></user-info>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Auth from './Auth.vue';
import UserInfo from './user-info.vue';

export default {
  data() {
    return {
      showLogin: false,
    };
  },
  props: {
    userInfoOpen: Boolean,
  },
  components: { Auth, UserInfo },
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

.user-status:hover {
  cursor: pointer;
}

.info-container {
  position: absolute;
  top: 55px;
  right: 40px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
