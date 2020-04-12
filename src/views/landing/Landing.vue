<template>
  <main class="landing-page">
    <carousel class="landing-page-carousel"/>
    <heading-article/>
    <suggestions/>
    <subjects/>
    <cat-advise/>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Carousel from "@/views/landing/components/Carousel.vue";
  import Suggestions from "@/components/Suggestions.vue";
  import CatAdvise from "@/components/CatAdvise.vue";
  import Subjects from "@/views/landing/components/Subjects.vue";
  import HeadingArticle from "@/views/landing/components/HeadingArticle.vue";

  export default Vue.extend({
      name: 'LandingView',
      components: {Subjects, Carousel, Suggestions, CatAdvise, HeadingArticle }
  });
</script>

<style lang="scss">
  @import "src/assets/styles/vars";
  @import "src/assets/styles/ui";

  .landing-page {
    .landing-page-carousel {
      margin: 3rem 2rem 0 2rem;
    }
  }
</style>
