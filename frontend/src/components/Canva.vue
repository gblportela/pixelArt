<template>
    <RouterLink class="canva-link" :to="'/art?id='+artId">
        <div class="canva-div" :id="id"></div>
    </RouterLink>
</template>
<script>
export default {
    name: 'Canva',
    props: {
        art: Object,
        id: String
    },
    data: function(){
        return{
            proportion: 0,
            pixels: [],
            artId: 0       
        }
    },
    mounted(){
        this.pixels = JSON.parse(this.art.pixels)
        this.proportion = this.art.proportion
        this.artId = this.art.id
        let canvaDiv = document.getElementById(this.id)
        for (let row = 0; row < this.proportion; row++) {
            const rowDiv = document.createElement('div')
            rowDiv.classList += 'p' + this.proportion
            for(let col = 0; col < this.proportion; col++){
                const pixelDiv = document.createElement('div')
                const pixelObj = this.pixels.find(pixelObj => pixelObj.p === this.proportion*(row) + col)

                if (pixelObj) pixelDiv.style.backgroundColor = pixelObj.c
                pixelDiv.classList += 'pixel'
                rowDiv.insertAdjacentElement('beforeend', pixelDiv)
            }   
            canvaDiv.insertAdjacentElement('beforeend', rowDiv)
        }
    }
}
</script>
<style>
*{
    box-sizing: border-box;
}

.row:nth-child(even) > .col:nth-child(odd){
    background-color: rgba(128, 128, 128, 0.37);
}
.row:nth-child(odd) > .col:nth-child(even){
    background-color: rgba(128, 128, 128, 0.37);
}
.canva-link{
    margin: 20px;
}
.canva-div{
    display: grid;
    width: clamp(300px, 20vw, 900px);
    height: clamp(300px, 20vw, 900px);
    background-color: white;
    border: 1px solid rgb(59, 56, 56);
    user-select: none;
    border-radius: 10px;
    transition: .1s;
}
.canva-div:hover{
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.267);
}
.p30{
    display: grid;
    grid-template-columns: repeat(30, 1fr);
}
.p50{
    display: grid;
    grid-template-columns: repeat(50, 1fr);
}
.pixel{
    display: block;
    height: 100%;
    width: 100%;
}
</style>