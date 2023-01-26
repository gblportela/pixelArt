import axios from 'axios'
import { createApp } from 'vue'
import Vuex from 'vuex'
 
createApp(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        isMenuVisible: false
    },
    mutations: {
        setUser(state, user){
            state.user = user
            if(user){
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else{
                delete axios.defaults.headers.common['Authorization']
            }

        },
        toggleMenu(state){
            state.isMenuVisible = !state.isMenuVisible
        },
        disableMenu(state){
            state.isMenuVisible = false
        }
    }
})