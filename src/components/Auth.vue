<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm()" v-model="formValidity">
        <v-text-field
          label="E-mail"
          v-model="email"
          type="email"
          prepend-icon="mdi-account-circle"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-alert
      :value="loginError != null"
      class="mx-auto"
      width="350"
      dense
      outlined
      type="warning"
      border="left"
      transition="scale-transition"
    >
      {{ loginError }}
    </v-alert>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info" @click.prevent="submitForm" :disabled="!formValidity">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AuthService from '../services/AuthService';

import { mapState } from 'vuex';
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loginError: null,
      email: '',
      password: '',
      showPassword: false,
      emailRules: [(value) => !!value || 'E-mail is required.'],
      passwordRules: [(value) => !!value || 'Password is required.'],
      formValidity: false,
    };
  },
  computed: {
    ...mapState(['loggedIn']),
    loginDialog() {
      return !this.loggedIn;
    },
  },
  methods: {
    ...mapMutations(['setUserId', 'setLoggedIn']),
    ...mapActions(['getMarkers']),
    async submitForm() {
      try {
        let userUri = await AuthService.login({
          email: this.email,
          password: this.password,
        });
        //TODO: get user info from api using userUri and store all info in vuex
        this.setUserId(userUri);
        this.setLoggedIn(true);
        this.getMarkers();
        this.$emit('toggleUserInfo');
      } catch (error) {
        if (error.response.data.error) {
          this.loginError = error.response.data.error;
        } else {
          this.loginError = 'Unknown error';
        }
      }
    },
  },
};
</script>

<style></style>
