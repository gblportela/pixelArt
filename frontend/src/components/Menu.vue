<template>
    <div id="menu">
        <div id="menu-options">    
            <RouterLink class="bt" to="/draw">desenhar</RouterLink>
            <RouterLink class="bt" to="/myarts">minhas arts</RouterLink>
        </div>
        <a href="#" v-if="user" class="bt" id="exit-bt" @click.prevent="logout">sair</a>
    </div>
</template>
<script>

import { userKey } from '@/global'
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    data(){
        return {

        }
    },
    computed: mapState([ 'user', 'isMenuVisible']),
    methods: {
        toggleMenu(){
            this.$store.commit('toggleMenu')
        },
        logout(){
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>
<style scoped>
*{
    text-decoration: none;
}
#menu{
    position: absolute;
    position: fixed;
    display: flex;
    box-shadow: 0 0 10px 1px black;
    background-color: #4C2CBF;
    justify-content: space-between;
    flex-direction: column;
    width: 300px;
    height: calc(100vh - 40px);
    top: 40px;
    right: 0;
    z-index: 1;
}

#menu-options{
    display: flex;
    flex-direction: column;
}
.bt{
    user-select: none;
    padding: 10px;
    color: white;
}
.bt:hover{
    background-color: white;
    color: #0597F2;
}
</style>