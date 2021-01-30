<template>
  <hooper class="landing-carousel" :settings="hooperConfig">
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
          image: require('../../../assets/images/landing/jan-sale-poster-web.jpg'),
          heading: 'Зимняя распродажа',
          subHeading: 'Скидки до 30% при покупке онлайн.',
          linkText: 'Перейти к скидкам',
          link: '/store/category/sale'
        }, {
        //   image: require('../../../assets/images/landing/landing-delivery.jpg'),
        //   heading: 'Бесплатная доставка',
        //   subHeading: 'По Москве и Санкт-Петербургу при заказе от 3000 рублей',
        //   linkText: 'Перейти в магазин',
        //   link: '/store/category/all'
        // }, {
          image: require('../../../assets/images/landing/landing-shop.jpg'),
          heading: 'Встретимся в шоуруме',
          subHeading: '',
          linkText: 'Как нас найти',
          link: '/about'
        }]
      }
    }
  });
</script>

<style>
  .landing-carousel {
    height: 90vh !important;
  }
  .landing-carousel .hooper-indicator {
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: black;
  }
  .landing-carousel .hooper-indicator.is-active {
    background-color: white !important;
  }
  .landing-carousel__slide {
    display: flex;
    justify-content: center;
  }
</style>