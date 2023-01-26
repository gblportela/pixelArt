<template>
    <div id="my-arts">
        <div id="canvaConteiner">
            <Canva class="canva" v-for="(art, index) in arts" :key="index" :id="'canva'+index" :art="art"/>
        </div>
        <button class="loadMoreBtn" @click="getArts">carregar mais</button>
    </div>
</template>
<script>

import Canva from '@/components/Canva.vue'
import { baseApiUrl } from '@/global';
import axios from 'axios';

export default {
    name: 'MyArts',
    components: {Canva},
    data(){
        return {
            arts: [],
            offset: 0
        }
    },
    methods:{
        getArts(){
            this.offset = document.getElementsByClassName('canva').length
            axios.get(`${baseApiUrl}/myarts?offset=${this.offset}`)
                .then(res => res.data.forEach(e => this.arts.push(e)))
        }
    },
    mounted(){
        this.getArts()
    }
}
</script>
<style>

#my-arts{
    padding: 60px 0 20px 0;
}

</style>