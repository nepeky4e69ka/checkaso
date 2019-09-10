<template>
    <div class="welcome">
        <p>{{error}}</p>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name:'Welcome',
        computed:{
            ...mapGetters(['tables', 'error'])
        },
        watch:{
            tables(nv){
                const firstTableName = Object.keys( nv )[0].toString();
                if( !this.$route.query.error ) this.$nextTick(()=> location.href = firstTableName );
                else this.$store.commit('setError', this.$route.query.error)

            }
        }
    }
</script>