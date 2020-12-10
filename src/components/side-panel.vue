<template>
    <div>
        <transition name="fade">
            <div>
                <v-card v-if="open" class="sidepanel" dark>
                    <v-card-title>
                        <h1>Create Marker</h1>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Latitude" v-model="coords.lat" />
                            <v-text-field label="Longitude" v-model="coords.lng" />
                            <v-file-input accept="image/*" label="File input" @change="onFileSelected"></v-file-input>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click.prevent="submitMarker" color="success">Add</v-btn>                        
                    </v-card-actions>
                </v-card>
            </div>
        </transition>
            
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

<style lang="scss" scoped>

    .sidepanel {  
        position: relative;
        height: calc(100vh - 50px);
        padding-top: 48px;
        max-width: 400px;
        background-color: black;
        //background-color: rgba($color: #242424, $alpha: .6);
    }

    .fade-enter{
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active{
        transform: opacity 4s;
    }

    .fade-leave-to{
        opacity: 0;
    }


</style>