<template>
  <v-dialog v-model="loginDialog" width="500">
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="submitForm()">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="E-mail"
                v-model="email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                v-model="password"
                counter
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
              <v-btn x-large block color="success" @click.prevent="submitForm">
                Login
              </v-btn>
              <v-btn x-large block color="warning" @click.prevent="getMarkers">
                Get Markers
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="loginDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
  data() {
    return {
      loginDialog: true,
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      let userUri = await AuthService.login({
        email: this.email,
        password: this.password,
      });
      //TODO: get user info from api using userUri and store all info in vuex
      this.$store.commit("setUserId", userUri);
    },
    getMarkers() {
      this.$store.dispatch("getMarkers");
    },
  },
};
</script>

<style></style>
