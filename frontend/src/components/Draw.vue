<template>
    <div class="content">
        <div id="controls">
            <div><img id="pencil" class="tool selected-tool" @click="selectTool" src="../assets/pencil.png" alt="" ></div>
            <div><img id="eraser" class="tool" @click="selectTool" src="../assets/eraser.png" alt=""></div>
        </div>
        <div class="canvaConteiner">
            <div v-if="proportion" class="canva">
                <div class="row" v-for="row in proportion" :key="row" :class="'p' + proportion">
                    <div class="col pixel" @click="paintOne" @pointerover="paint" @mouseover="paint" v-for="col in proportion" :key="col"></div>
                </div>
            </div>
            <div id="form">
                <button id="publish-btn" @click="publish">publicar</button>
            </div>
        </div>
    </div>
</template>
<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'Draw',
    data: function(){
        return{
            proportion: 30,
            draw: false,
            pencil: true,
            eraser: false,
            color: 'black',
            artObj: { pixels: []}
        }
    },
    computed:
        mapState(['user']),
    methods: {
        // drawCanva(){
        //     this.proportion = `p${this.row, this.col}`
        //     for(let row = 0; row < this.row; row++){
        //         for(let col = 0; col < this.col; col++) {
        //             const canvaDiv = document.querySelector('.canva')
        //             const div = document.createElement('div')
        //             div.setAttribute('row', row)
        //             div.setAttribute('col', col)
        //             div.classList += 'pixel'
        //             if(row % 2 == 0 && col % 2 == 0){
        //                 div.style.backgroundColor = 'rgba(128, 128, 128, 0.37)'
        //             } else if( row % 2 !== 0 && col % 2 !== 0){
        //                 div.style.backgroundColor = 'rgba(128, 128, 128, 0.37)'
        //             }
        //             div.addEventListener('mouseover', () =>{
        //                 if(this.draw){
        //                     if(this.pencil){
        //                         div.style.backgroundColor = 'black'
        //                     }
        //                     else if(this.eraser){
        //                         if(row % 2 == 0 && col % 2 == 0){
        //                             div.style.backgroundColor = 'rgba(128, 128, 128, 0.37)'
        //                         } else if(row % 2 == 0 && col % 2 !== 0){
        //                             div.style.backgroundColor = 'white'
        //                         } else if( row % 2 !== 0 && col % 2 !== 0){
        //                             div.style.backgroundColor = 'rgba(128, 128, 128, 0.37)'
        //                         } else if(row % 2 !== 0 && col % 2 == 0) {
        //                             div.style.backgroundColor = 'white'
        //                         }
        //                     }
        //                 }
        //             })
        //             div.addEventListener('mousedown', () =>{
        //                 if(this.pencil){
        //                         div.style.backgroundColor = 'black'
        //                 }   else if(this.eraser){
        //                     if(row % 2 == 0 && col % 2 == 0){
        //                         div.style.backgroundColor = 'rgba(128, 128, 128, 0.37)'
        //                     } else if(row % 2 == 0 && col % 2 !== 0){
        //                         div.style.backgroundColor = 'white'
        //                     } else if( row % 2 !== 0 && col % 2 !== 0){
        //                         div.style.backgroundColor = 'rgba(128, 128, 128, 0.37)'
        //                     } else if(row % 2 !== 0 && col % 2 == 0) {
        //                         div.style.backgroundColor = 'white'
        //                     }
        //                 }
        //             })
        //             canvaDiv.insertAdjacentElement('beforeend', div)
        //         }
        //     }
        //     window.addEventListener('mousedown', () => this.draw = true)
        //     window.addEventListener('mouseup', () => this.draw = false)
        // },
        paint(e){
            if(this.pencil && this.draw){
                e.target.style.backgroundColor = this.color
            } else if(this.eraser && this.draw){
                e.target.removeAttribute("style")
            }
        },
        paintOne(e){
            if(this.pencil) e.target.style.backgroundColor = this.color
            else e.target.removeAttribute("style")
        },
        init(){
            window.addEventListener('mousedown', () => this.draw = true)
            window.addEventListener('mouseup', () => this.draw = false)
        },
        selectTool(e){
            const tool = document.querySelector(".selected-tool")
            if(tool) tool.classList.remove('selected-tool')
            e.target.classList.add('selected-tool')
            if(e.target.id === 'pencil') this.pencil = true, this.eraser = false
            else if(e.target.id === 'eraser') this.eraser = true, this.pencil = false
        },
        publish(){
            let pixels = Array.from(document.getElementsByClassName('pixel'))
            pixels.forEach((e, index) => {
                if(e.style.backgroundColor !== ''){
                    console.log(e.style.backgroundColor)
                    this.artObj.pixels.push({p: index, c: e.style.backgroundColor}) //p = position, c = color
                }
            })
            this.artObj.proportion = this.proportion
                axios.post(`${baseApiUrl}/art`, { art: this.artObj })
                    .then(this.$router.push({name: 'feed'}))
                    .catch(res => window.alert('Erro: ' + res.response.data))  
             }
    },
    mounted(){
        //this.drawCanva()
        this.init()
    }
}
</script>
<style scoped>
*{
    box-sizing: border-box;
}
.selected-tool{
    border: 2px black dashed;
}
.row:nth-child(even) > .col:nth-child(odd){
    background-color: rgba(128, 128, 128, 0.37);
}
.row:nth-child(odd) > .col:nth-child(even){
    background-color: rgba(128, 128, 128, 0.37);
}
#controls{
    position: absolute;
    height: fit-content;
    background-color: white;
    border: 1px solid black;
    box-shadow: 2px 2px black;
    z-index: 2;
    top: 100px;
    left: 50px;
}
#publish-btn{
    float: right;
    margin: 5px;
}
.content{
    background-color: #0597F2;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
}
.tool{
    height: 30px;
    margin: 2px;
}
.canvaConteiner{
    display: flex;
    flex-direction: column;
    
}
.canva{
    display: grid;
    width: clamp(300px, 30vw, 900px);
    height: clamp(300px, 30vw, 900px);
    background-color: white;
    border: 4px solid black;
    user-select: none;
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