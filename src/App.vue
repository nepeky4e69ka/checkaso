<template>
  <div id="app">
      <main>
          <transition name="fade">
              <router-view/>
          </transition>
      </main>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'checkASO',
        computed:{
            ...mapGetters(['tables', 'states']),
        },
        methods:{
            ...mapActions(['GET_APPS', 'RESTORE_STATES'])
        },
        async beforeMount(){
            await this.RESTORE_STATES();
            await this.GET_APPS( this.states.query );
        }
    }
</script>
<style>
  @import "assets/css/style.css";
  @import "assets/css/fonts.css";
</style>
