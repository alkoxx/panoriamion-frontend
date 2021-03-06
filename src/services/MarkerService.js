import axios from 'axios';
import store from '../store/store';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
});

export default {
  async fetchMarkers() {
    let response;
    let markers = [];
    try {
      response = await apiClient.get('/api/markers');
    } catch (error) {
      console.log(error);
    }
    response = response.data['hydra:member'];
    //TODO: Para evitar este loop crear un getter en la api para que me de el position como un objeto
    response.forEach((marker) => {
      let m = {
        id: marker.id,
        position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        description: marker.description,
      };
      markers.push(m);
    });
    return markers;
  },
  async addMarker(form) {
    try {
      let marker = await apiClient.post('/api/markers', {
        lat: form.lat.toString(),
        lng: form.lng.toString(),
        description: 'Sample desc',
        owner: store.getters.userId,
      });
      this.addFileObject(marker.data['@id'], form.file);
    } catch (error) {
      console.log(error);
    }
  },
  async removeMarker(markerId) {
    try {
      await apiClient.delete('/api/markers/' + markerId);
    } catch (error) {
      console.log(error);
    }
  },
  async addFileObject(markerIRI, file) {
    const fd = new FormData();
    fd.append('image', file);
    try {
      await apiClient.post(markerIRI + '/file', fd);
    } catch (error) {
      console.log(error);
    }
  },
};
