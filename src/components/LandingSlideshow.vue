<template>
  <div class="landing-slide-show">
    <img class="landing-slide-show__image" src="../assets/images/store/landing-slideshow.jpg" alt="hero image">
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
    display: flex;
    justify-content: center;
    &__image {
      max-width: 1200px;
      height: calc(100vh - 20rem);
      width: 100%;
      object-fit: cover;
      object-position: 100% 100%;
    }
  }
</style>