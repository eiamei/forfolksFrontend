<template>
  <article class="landing-page-heading">
    <h1 class="big-serif-heading landing-page-heading__header">{{$t('landing.heading.header')}}</h1>
    <p class="regular-sans-text landing-page-heading__about" v-html="$t('landing.heading.about')"></p>
    <p class="regular-sans-text landing-page-heading__about">{{$t('landing.heading.about2')}}</p>
    <p class="regular-sans-text landing-page-heading__about">{{$t('landing.heading.about3')}}</p>
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    &__header {
      /* max-width: 600px; */
      margin: 2rem 0 3rem;
      @media screen and (max-width: $mobile) {
        margin: 0;
        text-align: center;
      }
    }
    &__about {
      max-width: 1300px;
      margin: 1rem;
      text-align: left;
      @media screen and (max-width: $mobile) {
        padding-top: 2rem;
        margin: 0 2rem;
        text-align: center;
      }
    }
  }
</style>