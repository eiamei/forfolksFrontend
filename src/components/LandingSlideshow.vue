<template>
  <div class="landing-slide-show">
    <img class="landing-slide-show__image" src="../assets/images/store/bowl-mild-black-marble.jpg">
  </div>
</template>

<script>
export default {
  name: 'LandingSlideshow'
};
</script>

<style lang="scss">
  .landing-slide-show {
    margin: 3rem 1rem 0 1rem;
    &__image {
      height: calc(100vh - 10rem);
      width: 100%;
      object-fit: cover;
    }
  }
</style>