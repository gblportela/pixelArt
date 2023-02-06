<template>
    <div id="feedDiv">
        <h1>feed</h1>
        <div>
            <div id="canvaConteiner">
                <Canva class="canva" v-for="(art, index) in arts" :key="index" :id="'canva'+index" :art="art"/>
            </div>
            <button class="loadMoreBtn" @click="getArt">carregar mais</button>
        </div>
        <Footer />
    </div>
</template>
<script>
import { baseApiUrl } from '@/global'
import Canva from './Canva'
import axios from 'axios'
import Footer from './Footer.vue'

export default{
    name: 'Feed',
    components: {
        Canva,
        Footer
    },
    data: function(){
        return {
            arts: [],
            offset: 0
        }
    },
    methods: {
        getArt(){
            this.offset = document.getElementsByClassName('canva').length
            axios.get(`${baseApiUrl}/art?offset=${this.offset}`)
                .then(res => res.data.forEach(e => this.arts.push(e)))
                .catch(res => console.log(res))
        }
    },
    mounted(){
        this.getArt()
    }
}

</script>
<style>
#feedDiv{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 0 0 0;
}

#canvaConteiner{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: auto;
    width: fit-content;
    flex-grow: 1;
}

.loadMoreBtn{
    color: #006CAE;
    padding: 10px;
    border-radius: 3px;
    border: solid 1px #006CAE;
    
}
button:active{
    transform: scale(1.1);
    box-shadow: 0 0 3px black;
}
</style>