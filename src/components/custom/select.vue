<template>
    <div class="custom_select"
         :class="{ show:showOptions }"
         :style="styles">
        <ul>
            <li  v-for="( option,index ) in options"
                 :key="option.id"
                 @click="selectOption( option,index )"
                 :class="{ single: !option.image }">

                <img :src="option.image"
                     v-if="option.image"/>
                <span> {{ option.content }} <star-s-v-g v-if="option.star"></star-s-v-g> </span>
            </li>
        </ul>
        <div @click="toggleSelect"
             class="custom_select_arrow">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"
     xml:space="preserve">
<g>
	<path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
</g>
</svg>
        </div>
        <a @click="toggleSelect"> {{ selectedLabel }} </a>
    </div>
</template>
<script>
    import starSVG from "@/assets/svg/star.svg"
    export default {
        name:'customSelect',
        props:['options', 'styles'],
        components:{ starSVG },
        data(){
            return{
                showOptions:false,
                selectedLabel:'Выбрать'
            }
        },
        methods:{
            toggleSelect(){
                this.showOptions = !this.showOptions;
            },
            selectOption( option, index ){
                this.$emit('valueSelected', { option,index });
                this.selectedLabel = option.content;
                // prevent double click
                setTimeout(this.toggleSelect, 50)
            }
        },
        watch:{
            options:{
                deep:true,
                handler(){
                    this.selectedLabel = this.options.filter(o => o.selected)[0].content
                }
            }
        }
    }
</script>