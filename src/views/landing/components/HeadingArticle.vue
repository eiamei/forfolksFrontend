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

<style>
  .landing-page-heading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .landing-page-heading__header {
    margin: 2rem 0;
  }
  .landing-page-heading__about {
    max-width: 1300px;
    text-align: left;
  }
</style>