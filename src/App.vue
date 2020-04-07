<template>
  <div class="app">
    <AppHeader/>
    <transition name="fade" mode="out-in">
      <router-view style="min-height: 90vh"/>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import AppHeader from './components/header/AppHeader';
import Footer from './components/Footer';

export default {
  name: 'app',
  components: {
    Footer,
    AppHeader
  },
  created () {
    window.addEventListener('resize', this.resizeHandler);
    this.$store.dispatch('store/loadStoreData');
  },
  mounted () {
    this.$store.dispatch('global/setNewWindowSize')
  },
  methods: {
    resizeHandler () {
      this.$store.dispatch('global/setNewWindowSize')
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
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
