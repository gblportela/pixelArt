<template>
    <Canva v-if="art" :art="art" :key="art.id" :id="'canva'+art.id"/> 
</template>
<script>

import Canva from '@/components/Canva.vue'
import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    components:{
        Canva        
    },
    data(){
        return {
            art: null
        }
    },
    methods:{
        getArt(){
            const artId = this.$route.query.id || null
            axios.get(`${baseApiUrl}/art/${artId}`).then(res => {
                this.art = res.data
            })
        }
    },
    mounted(){
        setTimeout(() => {
            this.getArt()
            
        }, 1000);
    }
}

</script>
<style>

</style>