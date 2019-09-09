<template>
    <div class="custom_checkbox">
        <ul>
            <li  v-for="option in options"
                 :key="option.id"
                 @click="selectOption(option)"
                 :class="{ active:option.selected }">
                <span>
                    <android-s-v-g v-if="option.value ==='ANDROID'"></android-s-v-g>
                    <apple-s-v-g v-if="option.value === 'APPLE'"> </apple-s-v-g>
                        {{ option.content }}
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
    import androidSVG from "@/assets/svg/android.svg"
    import appleSVG from "@/assets/svg/apple.svg"
    export default {
        name:'customCheckbox',
        props:['options'],
        components:{
            androidSVG, appleSVG
        },
        data(){
            return{
                selectedValue:'ALL'
            }
        },
        methods:{
            selectOption( option ){
                this.selectedValue = option.value;
                this.$emit('valuesSelected', this.selectedValue)

            }
        }
    }
</script>