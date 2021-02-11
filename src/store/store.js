import Vue from 'vue';
import Vuex from 'vuex';
import MarkerService from '../services/MarkerService';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: null,
    loggedIn: false,
    markers: [],
  },
  getters: {
    markers: (state) => {
      return state.markers;
    },
    userId: (state) => {
      return state.userId;
    },
  },
  mutations: {
    setMarkers: (state, markers) => {
      state.markers = markers;
    },
    setUserId: (state, userId) => {
      state.userId = userId;
    },
    setLoggedIn: (state, loggedIn) => {
      state.loggedIn = loggedIn;
    },
    resetValues: (state) => {
      state.userId = null;
      state.loggedIn = false;
      state.markers = [];
    },
  },
  actions: {
    async getMarkers({ commit }) {
      const markers = await MarkerService.fetchMarkers();
      commit('setMarkers', markers);
    },
  },
  plugins: [createPersistedState({ paths: ['userId', 'loggedIn'] })],
});
