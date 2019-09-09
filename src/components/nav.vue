<template>
    <nav>
        <ul>
            <li v-for="(table, name, index) in tables"
                @click="clickRoute(index)"
                :key="table.id">
                <router-link :to="{name:'app', params:{ app:name }}">
                    <span>{{ table.name }}</span>
                </router-link>
            </li>
        </ul>
        <filter-component></filter-component>
    </nav>
</template>
<script>
    import { mapGetters } from 'vuex'
    import filterComponent from './filter.vue'
    export default {
        name: 'Nav',
        components: { filterComponent },
        computed: {
            ...mapGetters(['tables'])
        },
        watch:{
            tables(){
                this.$nextTick(() => this.setCurrent());
            }
        },
        methods:{
            clickRoute( index ){
                // curved tabs
                let elements = document.querySelectorAll('nav ul li a');
                elements.forEach(e => {
                    e.classList.remove('next');
                    e.classList.remove('prev')
                });

                if( index + 1 !== elements.length ) elements[ index + 1].classList.add('next');
                if( index > 0) elements[ index - 1].classList.add('prev');
            },
            setCurrent(){
                for (let [ key ] of Object.entries(this.tables)) {
                    if( key === this.$route.params.app){
                        const index = Object.keys(this.tables).indexOf( key );
                        this.clickRoute( index );
                        break
                    }
                }
            }

        }

    }
</script>