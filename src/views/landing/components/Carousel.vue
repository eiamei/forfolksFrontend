<template>
  <div>
    <stay-home/>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import StayHome from './CarouselItems/StayHome.vue';

    export default Vue.extend({
        name: 'Carousel',
        components: { StayHome }
    });
</script>

<style scoped>

</style>