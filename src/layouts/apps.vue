<template>
    <div class="apps">
        <navigation></navigation>
        <div class="apps_container">
            <p v-if="!applications.length" class="no_elements">Нет приложений</p>
            <app v-for="a in applications"
                 :key="a.id"
                 :data="a"
                 >
            </app>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import navigation from '@/components/nav.vue'
    import app from '@/components/app.vue'

    export default {

        name:'Apps',
        components: { navigation, app },
        computed:{
            ...mapGetters(['applications', 'states', 'tables'])
        },
        methods:{
            ...mapActions(['SET_APPLICATIONS', 'GET_APPS']),
            setApps(){
                // this is NOT better option for filter apps
                // in my opinion should be query to backend with params, and then set response to the store
                let apps        = [],
                    table       = this.$route.params.app,
                    platform    = this.states.query.platform.toLowerCase(),
                    rating      = this.states.query.rating,
                    query       = Object.keys( this.states.query );

                if( query.length > 0 ) {
                    if(platform === 'all' ) apps = this.tables[ table ].applications.filter( a => parseFloat( a.rating ) >= rating );
                    else apps = this.tables[ table ].applications.filter( a => parseFloat( a.rating ) >= rating && a.platform === platform );
                }
                else apps = this.tables[ table ].applications;
                this.SET_APPLICATIONS( apps );
            }
        },
        async updated(){
            if( navigator.vendor.toLowerCase().includes('apple') ) {
                try {
                   await this.$H.transformImages()
                }
                catch (error){
                    this.$store.commit('setError', error );
                    this.$route.push({ name:'welcome', query:{ error:true } })
                }
            }
        },
        watch:{
            '$route'(){
                this.setApps()
            },
            tables(){
                this.setApps()
            }
        }
    }
</script>