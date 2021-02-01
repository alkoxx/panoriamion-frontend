import axios from "axios";
import store from "../store/store";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  /*
    headers: {
        Accept: 'application/json',
        'Content type': 'application/json'
    }
    */
});

export default {
  async fetchMarkers() {
    let response;
    let markers = [];
    try {
      response = await apiClient.get("/api/markers");
    } catch (error) {
      console.log(error);
    }
    response = response.data["hydra:member"];
    //TODO: Para evitar este loop crear un getter en la api para que me de el position como un objeto
    response.forEach((marker) => {
      let m = {
        id: marker.id,
        position: { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) },
        description: marker.description,
        image: marker.imagePath,
      };
      markers.push(m);
    });
    return markers;
  },
  async addMarker(form) {
    const fd = new FormData();
    fd.append("image", form.selectedFile);
    fd.append("lat", form.lat);
    fd.append("lng", form.lng);
    fd.append("owner", store.getters.userId);
    try {
      await apiClient.post("/marker/add-marker", fd);
    } catch (error) {
      console.log(error);
    }
  },
};
