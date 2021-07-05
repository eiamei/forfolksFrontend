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

  export default Vue.extend({
    name: 'LandingView',
    components: {/* Subjects, */Carousel, Suggestions, /* CatAdvise,*/ HeadingArticle},
    computed: {
      storeItems () {
        return this.$store.state.shop.items
          .filter(function (item) {
            return item.badges.includes('new') && item.availability > 0;
          });
      },
    }
  });
</script>

<style>
  .landing-page {
    text-align: center;
    min-height: 80vh;
  }
  .landing-page .landing-page-hero-text {
    margin: 4rem 2rem 2rem 2rem;
  }
  .landing-page .to-shop-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid black;
    margin: 0 0 4rem 0;
    cursor: pointer;
    color: black;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  .landing-page .to-shop-button:hover {
    background-color: var(--dark-blue);
    border: 1px solid var(--dark-blue);
    color: white;
  }
  .landing-page .landing-page-recomendasion {
    text-align: center;
    margin-bottom: 0;
  }
  .landing-page .landing-page-suggestions {
    margin: 2rem 1rem 3rem 1rem;
  }
</style>
