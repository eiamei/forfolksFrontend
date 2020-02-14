<template>
  <div class="app">
    <AppHeader/>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './Core/Components/Header/AppHeader';

export default {
  name: 'app',
  components: {
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
</style>
