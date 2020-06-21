<template>
  <div class="app">
    <AppHeader />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>

<script>
    import Vue from 'vue';
    import AppHeader from './components/header/AppHeader.vue';
    import Footer from './components/Footer.vue'

    export default Vue.extend({
        name: 'app',
        components: {
            Footer,
            AppHeader
        },
        created() {
            window.addEventListener('resize', this.resizeHandler);
        },
        mounted() {
            this.$store.dispatch('global/setNewWindowSize')
        },
        methods: {
            resizeHandler() {
                this.$store.dispatch('global/setNewWindowSize')
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resizeHandler)
        }
    });
</script>

<style lang="scss">
  @import "assets/styles/globals";
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  .app {
    display: flex;
    flex-direction: column;
  }
</style>
