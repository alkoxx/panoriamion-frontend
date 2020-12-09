<template>
    <div>
        <transition name="fade">
            <div v-if="open" class="sidebar">kokoko</div>
        </transition>
            
        <div style="position:absolute; top:0; left:0; width:400px; height:100vh; background:rgba(0, 0, 0, 0.3); padding:10px">
          
          <form enctype="multipart/form-data">
            <input type="text" placeholder="Latitude" v-model="form.lat">
            <input type="text" placeholder="Longitude" v-model="form.lng">
            <input type="file" @change="onFileSelected" />

            <button @click.prevent="submitMarker">Add Marker</button>
          </form>

          <img v-if="imgUrl" :src="imgUrl" alt="" width="100%" height="300">
          
        </div>      
        
        <div style="border:1px solid red; position:relative">aaa
            <v-btn @click="toggleSidePanel">Toggle</v-btn>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'SidePanel',
    props: {
        coords: Object
    },
    data() {
        return{
            open: true,
            selectedFile: ''
        }
    },
    methods: {
        submitMarker(){
            //addMarker(serverUrl + '/marker/add-marker', this.form)
            this.getMarkers()
        },
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },
        toggleSidePanel(){
            this.open = !this.open
        }
    }

}
</script>

<style>

.sidebar {
    position: relative;
    height: calc(100vh - 50px);
    background-color: rgba(0,0,0,0.5);
    width:300px;
}

.fade-enter{
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active{
    transform: opacity 4s ease-in;
}

.fade-leave-to{
    opacity: 0;
}


</style>