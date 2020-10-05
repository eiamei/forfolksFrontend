<template>
  <hooper class="landing-carousel" style="height: 90vh" :settings="hooperConfig">
    <Slide class="landing-carousel__slide" v-for="slide in slideData" :key="slide.heading">
      <Shop :image="slide.image"
            :heading="slide.heading"
            :subHeading="slide.subHeading"
            :linkText="slide.linkText"
            :link="slide.link"
      />
    </Slide>
    <pagination slot="hooper-addons"></pagination>
  </hooper>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Basic from './CarouselItems/Basic.vue';
  import Shop from './CarouselItems/Shop.vue';
  import { Hooper, Slide, Pagination } from 'hooper';

  export default Vue.extend({
    name: 'Carousel',
    components: { Hooper, Slide, Pagination, Shop },
    data () {
      return {
        hooperConfig: {
          wheelControl: false,
          autoPlay: true,
          playSpeed: 4000,
          infiniteScroll: true
        },
        slideData: [{
          image: require('../../../assets/images/landing/landing-market-3.jpg'),
          heading: '10-11 октября',
          subHeading: 'На маркете в Василеостровском рынке',
          linkText: 'В магазин',
          link: '/store/category/all'
        }, {
          image: require('../../../assets/images/landing/landing-shop.jpg'),
          heading: 'Встретимся в шоуруме',
          subHeading: '',
          linkText: 'Как нас найти',
          link: '/about'
        }, {
          image: require('../../../assets/images/landing/landing-delivery.jpg'),
          heading: 'Бесплатная доставка',
          subHeading: 'По Москве и Санкт-Петербургу при заказе от 3000 рублей',
          linkText: 'Перейти в магазин',
          link: '/store/category/all'
        }, {
          image: require('../../../assets/images/landing/landing-accessories.jpg'),
          heading: 'Кухонные аксессуары',
          subHeading: 'Мелочи, которые сделают жизнь удобнее',
          linkText: 'Перейти в магазин',
          link: '/store/category/accessories'
        }, {
          image: require('../../../assets/images/landing/landing-textile.jpg'),
          heading: 'Текстиль для дома',
          subHeading: 'Как быстро сделать дом уютнее',
          linkText: 'Перейти в магазин',
          link: '/store/category/textile'
        }]
      }
    }
  });
</script>

<style lang="scss">
  .landing-carousel {
    outline: none;
    .hooper-indicator {
      width: 10px;
      height: 10px;
      border: 1px solid black;
      border-radius: 10px;
      background-color: black;
    }
    .hooper-indicator.is-active {
      background-color: white!important;
    }
    &__slide {
      display: flex;
      justify-content: center;
    }
  }
</style>