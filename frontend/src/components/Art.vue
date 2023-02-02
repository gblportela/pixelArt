<template>
    <div id="art-div">
        <Canva v-if="art" :art="art" :key="art.id" :id="'canva'+art.id"/>
        <h1 v-else>art não encontrada :/</h1>
        <div id="bts-div">
            <button id="share-bt" class="bt" @click="shareArt">compartilhar</button>
            <button id="delete-bt" class="bt" @click="deleteArt" v-if="belongsToUser">excluir</button>
        </div>
    </div>

</template>
<script>

import Canva from '@/components/Canva.vue'
import axios from 'axios';
import { baseApiUrl } from '@/global';
import { mapState } from 'vuex';

export default {
    components:{
        Canva        
    },
    computed: {
        ...mapState(['user']),
        belongsToUser(){
            if(this.user && this.art){
                return this.user.id === this.art.authorId
            } else{
                return false
            }
        }
    },
    data(){
        return {
            art: null,
            artId: null,
        }
    },
    methods:{
        getArt(){
            axios.get(`${baseApiUrl}/art/${this.artId}`).then(res => this.art = res.data)
        },
        deleteArt(){
            axios.delete(`${baseApiUrl}/art/${this.artId}`).then(this.$router.push({name: 'myarts'}))
        }
    },
    mounted(){
        this.artId = this.$route.query.id || null
        this.getArt()
    }
}

</script>
<style scoped>
#art-div{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.bt{
    padding: 10px;
    border-radius: 3px;
    border: solid 1px #006CAE;
    margin: 5px;
    color: white;
}

#share-bt{
    background-color: #23CF5C;
}

#delete-bt{
    background-color: #D12C38;
}
</style>