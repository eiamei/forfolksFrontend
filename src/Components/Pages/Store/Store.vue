<template>
  <div class="stores">
    <cards class="stores__cards"/>
  </div>
</template>

<script>
  import Cards from './Cards/Cards';
  export default {
    name: 'Store',
    components: {Cards}
  };
</script>

<style lang="scss">
  .stores {
    min-height: calc(100vh);
    height: 100%;
    /*background-image: linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.2)), url("../../../assets/images/concretebg.jpg");*/
    margin: 48px 0 0 0;
  }
</style>