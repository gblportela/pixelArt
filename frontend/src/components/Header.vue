<template>
    <div id="headerDiv">
        <RouterLink id="logo" to="/">PAINTit</RouterLink>
        <div @click="toggleMenu" class="bt" id="menu-bt">menu</div>
    </div>
</template>
<script>

export default{
    name: 'Header',
    methods:{
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
    }
}
</script>
<style scoped>
#logo{
    justify-content: center;
    align-self: center;
    margin: 10px;
    font-size: 15pt;
    text-decoration: none;
    color: white;
}

#headerDiv{
    display: flex;
    position: fixed;
    justify-content: space-between;
    width: 100%;
    background-color: #4C2CBF;
    color: white;
    z-index: 2;
}
#userButtons{
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.bt{
    padding: 10px 2px 10px 2px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: none;
    text-decoration: none;
    font-size: 15pt;
    cursor: pointer;
    padding: 10px;
    user-select: none;
}
.bt:hover{
    color: #006CAE;
    background-color: white
}
</style>