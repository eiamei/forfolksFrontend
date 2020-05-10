<template>
  <div>
    <Basic/>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Basic from './CarouselItems/Basic.vue';

    export default Vue.extend({
        name: 'Carousel',
        components: { Basic }
    });
</script>

<style scoped>

</style>