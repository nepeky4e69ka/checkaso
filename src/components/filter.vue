<template>
    <div class="filtering">
        <div class="filter_block">
            <label>Фильтр</label>
            <custom-checkbox
                    :options="platforms"
                    :styles="styles"
                    @valuesSelected="valuesSelected"
            ></custom-checkbox>
        </div>
        <div class="filter_block">
            <label>Рейтинг</label>
            <custom-select :options="options"
                           :styles="styles"
                           @valueSelected="valueSelected"
            ></custom-select>
        </div>

    </div>
</template>
<script>

    import { mapActions, mapGetters } from 'vuex'
    import customSelect from '@/components/custom/select.vue'
    import customCheckbox from '@/components/custom/checkbox.vue'

    export default {
        name:'FilterComponent',
        components:{ customSelect,customCheckbox },
        computed:{
            ...mapGetters(['states'])
        },
        data(){
            return{
                styles:{ width:'200px' },
                options:[],
                platforms:[]
            }
        },
        methods:{
            ...mapActions(['GET_APPS']),
            valueSelected( value ){
                this.filterApps({ rating:value.option.value })
            },
            valuesSelected( selected ){
                // sadness
                const _platforms = this.platforms;
                _platforms.map(( p,i ) => _platforms[i].selected = selected.includes( p.value ));
                this.platforms = _platforms;
                this.filterApps({ platform:selected })
            },
            filterApps(obj){
                this.GET_APPS(obj)
            }
        },
        mounted(){

            // here we can set filters by existing parameters app (ex: rating/location/price);
            const Options = [
                { content:'Выбрать',  value:0, star:false},
                { content:'от 3.0', value:3, star:true },
                { content:'от 4.0', value:4, star:true},
                { content:'от 5.0', value:5, star:true}
            ];
            const Platforms = [
                { content:'Все',value:'ALL', selected:true },
                { content:'',   value:'APPLE', selected:false },
                { content:'',   value:'ANDROID', selected:false }
            ];

            // set active filters
            Options.forEach(( o,i) => Options[i].selected = this.states.query.rating === o.value );
            Platforms.forEach(( p,i ) => Platforms[i].selected = this.states.query.platform === p.value );

            this.options = Options;
            this.platforms = Platforms;

        }
    }
</script>