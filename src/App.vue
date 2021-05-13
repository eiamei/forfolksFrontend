<template>
  <div id="app">
    <main class="container">
      <h1>Всем привет 🙌🏻</h1>
      <p>Благодаря всем вам это был очень интересный год. Почти год назад, в июне 2020 года мы открыли двери нашего шоурума и нам посчастливилось узнать множество прекрасных людей: от мастеров со всей России до наших гостей, таких разных и увлекательных 😍</p>
      <p>Эти знакомства сильно вдохновили и многому научилии нас, заставили задуматься о том что и как мы делаем🤔</p>
      <p>Мы пришли к тому, что наша сердце больше лежит к тому, чтобы создавать и чтобы не сбивать фокус мы обновим шоурум и сайт так, что там будут преимущественно предметы нашего производства✨</p>
      <p>Огромная благодарность всем мастерам, что поверили в нас и согласились поработать с нами, а так же всем гостям, что тепло отзывались о нашем пространстве🖤</p>
      <p>Совсем скоро мы увидимся снова. Обновленные.</p>
      <p>Мы в процессе переезда на <a href="https://forfolks.co">новый сайт</a>, совсем скоро все новинки будут там</p>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue';
  import AppHeader from './components/header/AppHeader.vue';
  import Footer from './components/Footer.vue'

  export default Vue.extend({
    name: 'app',
    components: {
      Footer,
      AppHeader
    },
    created() {
      window.addEventListener('resize', this.resizeHandler);
      window.addEventListener('storage', this.onStorageUpdate);
      this.$store.dispatch('shop/createItemsList');
    },
    mounted() {
      this.$store.dispatch('global/setNewWindowSize');
      this.$store.dispatch('promo/checkPromoExistence');
    },
    methods: {
      resizeHandler() {
        this.$store.dispatch('global/setNewWindowSize')
      },
      onStorageUpdate () {
        this.$store.dispatch('bag/get');
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandler)
    }
  });
</script>

<style>
  @import "assets/styles/globals.css";
  @import 'assets/styles/ui.css';
  .container {
    margin: 0 auto;
    max-width: 50rem;
    padding: 1rem
  }
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  .full-height-container {
    min-height: 100vh;
  }
</style>
