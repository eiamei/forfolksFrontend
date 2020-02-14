<template>
  <main class="landing-page">
    <landing-slideshow/>
    <section class="landing-page-heading">
      <h1>Дизайн для современной жизни</h1>
      <p class="landing-page-heading__hero-text">Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.</p>
    </section>
    <article class="landing-page-about">
      <section class="landing-page-about__container" v-for="(item, index) in about" :key="item.header">
        <img :class="aboutImageClass(index)" :src="item.image" :alt="item.header"/>
        <div :class="aboutDescriptionClass(index)">
          <h2>{{item.header}}</h2>
          <p>{{item.text}}</p>
          <router-link to="store/all">В магазин</router-link>
        </div>
      </section>
    </article>
    <section></section>
  </main>
</template>

<script>
import LandingSlideshow from '../components/LandingSlideshow';
export default {
  name: 'Landing',
  components: {LandingSlideshow},
  data () {
    return {
      about: [{
        image: require("../assets/images/store/landing_concrete.jpg"),
        header: 'Бетон',
        text: 'Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.'
      }, {
        image: require("../assets/images/store/landing_concrete.jpg"),
        header: 'Бетон',
        text: 'Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.'
      },{
        image: require("../assets/images/store/landing_concrete.jpg"),
        header: 'Бетон',
        text: 'Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.'
      }, {
        image: require("../assets/images/store/landing_concrete.jpg"),
        header: 'Бетон',
        text: 'Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.'
      }]
    }
  },
  methods: {
    aboutImageClass (index) {
      return {
        'landing-page-about__image': true,
        'landing-page-about__image--right': !!((index + 1) % 2)
      }
    },
    aboutDescriptionClass (index) {
      return {
        'landing-page-about__description': true,
        'landing-page-about__description--right': !((index + 1) % 2)
      }
    }
  }
};
</script>

<style lang="scss">
  .landing-page {
    font-family: 'Playfair Display', serif;
  }
  .landing-page-heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    &__hero-text {
      max-width: 800px;
      margin: 1rem;
    }
  }
  .landing-page-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    &__container {
      display: flex;
      max-width: 1200px;
      margin: 0 1rem 4rem 1rem;
    }
    &__image {
      width: calc(50% - 3rem);
      margin: 0;
      order: 1;
      &--right {
        margin-right: 3rem;
      }
    }
    &__description {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: calc(50% - 3rem);
      order: 2;
      margin: 0;
      font-size: 1rem;
      &--right {
        order: 0;
        margin: 0 2rem 0 1rem;
      }
    }
  }
</style>