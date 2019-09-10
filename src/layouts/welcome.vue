<template>
    <div class="welcome">
        <p>{{ error }}</p>
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
            tables( nv ){
                if( !this.$route.query.error ) this.$nextTick(()=> location.href = Object.keys( nv )[0].toString());
            }
        }
    }
</script>