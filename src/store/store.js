import Vue from 'vue'
import Vuex from 'vuex'
import MarkerService from '../services/MarkerService'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        markers: []
    },
    getters: {
        markers: state => {
            return state.markers
        }
    },
    mutations: {
        setMarkers: (state, markers) => {
            state.markers = markers
        }
    },
    actions: {
        async getMarkers({ commit }) {
            const markers = await MarkerService.fetchMarkers()
            commit('setMarkers', markers)
        }
    }
})