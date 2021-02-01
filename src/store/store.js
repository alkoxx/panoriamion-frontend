import Vue from "vue";
import Vuex from "vuex";
import MarkerService from "../services/MarkerService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
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
  },
  actions: {
    async getMarkers({ commit }) {
      const markers = await MarkerService.fetchMarkers();
      commit("setMarkers", markers);
    },
  },
});
