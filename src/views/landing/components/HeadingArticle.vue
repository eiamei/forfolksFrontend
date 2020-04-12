<template>
  <article class="landing-page-heading">
    <h1 class="big-serif-heading landing-page-heading__header">{{$t('landing.heading.header')}}</h1>
    <p class="regular-sans-text landing-page-heading__about">{{$t('landing.heading.about')}}</p>
  </article>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'LandingHeading',
    });
</script>

<style lang="scss">
  @import "src/assets/styles/vars";
  @import "src/assets/styles/ui";

  .landing-page-heading {
    margin: 4rem 2rem 0 2rem;
    display: flex;
    justify-content: center;
    @media screen and (max-width: $mobile) {
      flex-direction: column;
      align-items: center;
    }
    &__header {
      max-width: 600px;
      margin: 0 2rem 0 4.5rem;
      @media screen and (max-width: $mobile) {
        margin: 0;
      }
    }
    &__about {
      max-width: 600px;
      margin: 0 2.5rem 0 2rem;
      @media screen and (max-width: $mobile) {
        padding-top: 2rem;
        margin: 0 2rem;
        text-align: center;
      }
    }
  }
</style>