<template>
    <Header v-if="user"/>
    <Content />
    
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import { mapState } from "vuex"
import Content from './components/Content.vue'
import Header from './components/Header.vue'


export default {
  name: 'App',
  components: {
    Header,
    Content
  },
    computed: mapState(['user', 'isMenuVisible']),
    methods: {
        validateToken(){
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            
            //this.$store.commit('setUser', null)
            if(!userData){
                this.$router.push({ name: 'auth'})
                return
            }
            axios.post(`${baseApiUrl}/validateToken`, userData)
                .then(res =>{
                    if(res.data){
                        this.$store.commit('setUser', userData)
                    } else{
                        localStorage.removeItem(userKey)
                        this.$router.push({ name: 'auth'})
                }
            })
            
        }
    },
    watch:{
        $route(){
            this.$store.commit('disableMenu')
        }
    },
    created(){
        this.validateToken()
    }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
*{
  font-family: 'Press Start 2P', cursive;
  font-size: 10pt;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: whitesmoke;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

</style>
