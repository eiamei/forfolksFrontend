<template>
  <main class="landing-page">
    <carousel />
    <article>
      <div></div>
      <suggestions/>
    </article>
    <section>
      <article></article>
    </section>
    <cat-advise/>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Carousel from "@/views/landing/components/Carousel.vue";
  import Suggestions from "@/components/Suggestions.vue";
  import CatAdvise from "@/components/CatAdvise.vue";

  export default Vue.extend({
      name: 'LandingView',
      components: { Carousel, Suggestions, CatAdvise }
  });
</script>

<style lang="scss">
  .landing-page {

  }
</style>

<!--<template>-->
<!--  <main class="landing-page">-->
<!--    <landing-slideshow/>-->
<!--    <article class="landing-page-heading">-->
<!--      <h1>Декор для современной жизни</h1>-->
<!--      <p class="landing-page-heading__hero-text">{{heroText}}</p>-->
<!--    </article>-->
<!--    <article class="landing-page-about">-->
<!--      <section class="landing-page-about__container" v-for="(item, index) in about" :key="item.header">-->
<!--        <img :class="aboutImageClass(index)" :src="item.image" :alt="item.header"/>-->
<!--        <div :class="aboutDescriptionClass(index)">-->
<!--          <h2>{{item.header}}</h2>-->
<!--          <p>{{item.text}}</p>-->
<!--          <router-link :to="item.link">В магазин</router-link>-->
<!--        </div>-->
<!--      </section>-->
<!--    </article>-->
<!--    <section></section>-->
<!--  </main>-->
<!--</template>-->

<!--<script>-->
<!--import LandingSlideshow from '../components/LandingSlideshow';-->
<!--export default {-->
<!--  name: 'Landing',-->
<!--  components: {LandingSlideshow},-->
<!--  data () {-->
<!--    return {-->
<!--      heroText: 'Forfolks - семейная студия, создающая товары для придания особой атмосферы в вашем доме или офисе.\n' +-->
<!--        'Наши изделия - это сочетание лаконичности, скандинавского минимализма и демократичных цен.\n' +-->
<!--        'Наша политика - декор должен быть доступный, чтобы каждый смог обустроить свой дом. \n' +-->
<!--        'Надеемся, что мы сможем сделать ваш дом немножко красивее!\n',-->
<!--      about: [{-->
<!--        image: require("../assets/images/store/landing-concrete.jpg"),-->
<!--        header: 'Бетон',-->
<!--        link: '/store/material/concrete',-->
<!--        text: 'Прочный и эффектный. Столь привычный строительный материал сегодня переживает свой ренесанс в ' +-->
<!--          'совершенно не свойственной, но такой подходящей для него среде. Он способен принять практически любую форму ' +-->
<!--          'и привнести особый шарм в интерьер.'-->
<!--      }, {-->
<!--        image: require("../assets/images/store/landing-dryflower.jpg"),-->
<!--        header: 'Сухоцветы',-->
<!--        link: '/store/material/dryflowers',-->
<!--        text: 'Красивые на вечность. Мы любим сухоцветы за безграничную нежность их оттенков и безприкословную неприхотливость. ' +-->
<!--          'Это кусочек дикой природы, навсегда застывший в своем самом прекрасном состоянии.'-->
<!--      },{-->
<!--        image: require("../assets/images/store/landing-cotton.jpg"),-->
<!--        header: 'Хлопок',-->
<!--        link: '/store/material/cotton',-->
<!--        text: 'Нежный и натуральный. Удивительную легкость в интерьер могут привнести изделия из хлопка, наполняя его ' +-->
<!--          'уютом и теплом. В своих изделях мы используем 100% хлопок.'-->
<!--      }]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    aboutImageClass (index) {-->
<!--      return {-->
<!--        'landing-page-about__image': true,-->
<!--        'landing-page-about__image&#45;&#45;right': Boolean((index + 1) % 2)-->
<!--      }-->
<!--    },-->
<!--    aboutDescriptionClass (index) {-->
<!--      return {-->
<!--        'landing-page-about__description': true,-->
<!--        'landing-page-about__description&#45;&#45;right': Boolean(!((index + 1) % 2))-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  .landing-page {-->
<!--    font-family: 'Playfair Display', serif;-->
<!--  }-->
<!--  .landing-page-heading {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    align-items: center;-->
<!--    padding: 0 1rem;-->
<!--    margin-top: 2rem;-->
<!--    &__hero-text {-->
<!--      max-width: 900px;-->
<!--      margin: 1rem;-->
<!--    }-->
<!--  }-->
<!--  .landing-page-about {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    justify-content: space-between;-->
<!--    align-items: center;-->
<!--    margin-top: 3rem;-->
<!--    &__container {-->
<!--      display: flex;-->
<!--      max-width: 1000px;-->
<!--      margin: 0 1rem 4rem 1rem;-->
<!--    }-->
<!--    &__image {-->
<!--      width: calc(50% - 2rem);-->
<!--      height: calc((50% - 2rem) / 2 * 3);-->
<!--      margin: 0;-->
<!--      order: 1;-->
<!--      object-fit: contain;-->
<!--      &&#45;&#45;right {-->
<!--        margin-right: 4rem;-->
<!--      }-->
<!--    }-->
<!--    &__description {-->
<!--      display: flex;-->
<!--      flex-direction: column;-->
<!--      justify-content: center;-->
<!--      width: calc(50% - 3rem);-->
<!--      order: 2;-->
<!--      margin: 0;-->
<!--      font-size: 1rem;-->
<!--      &&#45;&#45;right {-->
<!--        order: 0;-->
<!--        margin: 0 4rem 0 1rem;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</style>-->