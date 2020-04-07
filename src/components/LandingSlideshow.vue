<template>
  <section class="landing-slide-show">
    <img class="landing-slide-show__image" :src="image" alt="Stay home">
    <div class="stay-home-text-wrapper">
      <h1>Оставайтесь дома</h1>
      <p>До 30 апреля при заказе от 2500р <br>бесплатная доставка по Санкт&nbsp;-&nbsp;Петербургу</p>
      <router-link class="stay-home-button" to="/store/category/all">Перейти в магазин</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LandingSlideshow',
  data () {
    return {
      horizontalImage: require('../assets/images/landing/stayhome-horizontal.jpg'),
      verticalImage: require('../assets/images/landing/stayhome-vertical.jpg')
    }
  },
  computed: {
    windowSize () {
      return this.$store.state.global.windowSize;
    },
    image () {
      return this.windowSize.width > 760 ? this.horizontalImage : this.verticalImage;
    }
  }
};
</script>

<style lang="scss">
  .landing-slide-show {
    position: relative;
    margin: 3rem 1rem 0 1rem;
    display: flex;
    justify-content: center;
    &__image {
      width: 100%;
      height: 100%;
    }
  }
  .stay-home-text-wrapper {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
    }
  }
  .stay-home-button {
    padding: 8px 16px;
    border: 1px solid black;
    margin-top: 1.5rem;
    cursor: pointer;
    color: black;
    text-decoration: none;
    transition: .2s all ease-in-out;
    &:hover {
      background-color: #7B6469;
      border: 1px solid #7B6469;
      color: white;
    }
  }
</style>