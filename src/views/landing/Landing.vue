<template>
  <main class="landing-page">
    <carousel class="landing-page-carousel"/>
    <heading-article class="landing-page-hero-text"/>
    <router-link class="to-shop-button" to="/store/category/all">Перейти в магазин</router-link>
    <h2 class="landing-page-recomendasion">Рекомендуем</h2>
    <suggestions class="landing-page-suggestions" :items="storeItems"/>
    <!-- <subjects/> -->
    <!--    <cat-advise/>-->
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Carousel from "../../views/landing/components/Carousel.vue";
  import Suggestions from "../../components/Suggestions.vue";
  // import CatAdvise from "../../components/CatAdvise.vue";
  // import Subjects from "../../views/landing/components/Subjects.vue";
  import HeadingArticle from "../../views/landing/components/HeadingArticle.vue";
  import {shuffle} from "../../utils/shuffle";

  export default Vue.extend({
    name: 'LandingView',
    components: {/* Subjects, */Carousel, Suggestions, /* CatAdvise,*/ HeadingArticle},
    computed: {
      storeItems () {
        return shuffle((this.$store.state.shop.items || [])
          .filter(function (item) {
            return item.badges.includes('new');
          }));
      },
    }
  });
</script>

<style lang="scss">
  @import "src/assets/styles/vars";
  @import "src/assets/styles/ui";

  .landing-page {
    text-align: center;
    .landing-page-carousel {
    }
    .landing-page-hero-text {
      margin: 4rem 2rem 2rem 2rem;
    }
    .to-shop-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border: 1px solid black;
      margin: 0 0 4rem 0;
      cursor: pointer;
      color: black;
      text-decoration: none;
      transition: .2s all ease-in-out;
      &:hover {
        background-color: $dark-blue;
        border: 1px solid $dark-blue;
        color: white;
      }
    }
    .landing-page-recomendasion {
      text-align: center;
      margin-bottom: 0;
    }
    .landing-page-suggestions {
      margin: 2rem 1rem 3rem 1rem;
    }
  }
</style>
