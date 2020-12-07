import axios from 'axios';

export async function fetchMarkers(url) {
    let response
    let markers = []
    try{
        response = await axios.get(url)
    }catch(error){
        console.log(error)
    }
    response = response.data['hydra:member']
    response.forEach(marker => {
        let m = {
                    id: marker.id,
                    position: {lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)},
                    description: marker.description,
                    image: marker.imagePath
                }
        markers.push(m)
    });
    return markers;
}

export async function addMarker(url, form) {
    const fd = new FormData();
    fd.append('image', form.selectedFile)
    fd.append('lat', form.lat)
    fd.append('lng', form.lng)
    try{
        await axios.post(url, fd);
    }catch(error){
        console.log(error)
    }
}
