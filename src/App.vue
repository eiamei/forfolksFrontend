<template>
  <div id="app">
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
      window.addEventListener('storage', this.onStorageUpdate);
      this.$store.dispatch('shop/createItemsList');
    },
    mounted() {
      this.$store.dispatch('global/setNewWindowSize');
      this.$store.dispatch('promo/checkPromoExistence');
    },
    methods: {
      resizeHandler() {
        this.$store.dispatch('global/setNewWindowSize')
      },
      onStorageUpdate () {
        this.$store.dispatch('bag/get');
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
  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }
</style>
