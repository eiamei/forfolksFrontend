<template>
  <div class="store">
    <cards/>
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
  .store {
    background-color: #F6F6F6;
    padding: 24px 48px;
    height: 100%;
  }
</style>