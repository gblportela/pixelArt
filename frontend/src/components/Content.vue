<template>
        <Menu v-show="isMenuVisible"/>
        <router-view></router-view>
</template>

<script>

import Menu from './Menu.vue'
import { mapState } from 'vuex';

export default {
    name: 'Content',
    components: {
        Menu
    },
    computed: mapState(['isMenuVisible']),
    props: {
        msg: String
    }
}
    
</script>

<style scoped>

</style>
