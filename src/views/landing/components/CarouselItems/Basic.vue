<template>
  <div class="stay-home">
    <img class="stay-home__image" :src="image" alt="Stay home"/>
    <div class="stay-home-text-wrapper">
      <h1 class="serif-heading" style="color: black; font-size: 3rem; margin-bottom: 0">Красивое хранение</h1>
      <router-link class="stay-home-button" to="/store/category/stand">Перейти в магазин</router-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'StayHome',
    data() {
      return {
        horizontalImage: require('../../../../assets/images/landing/landing-basic-horizontal.jpg'),
        verticalImage: require('../../../../assets/images/landing/landing-basic-vertical.jpg')
      }
    },
    computed: {
      windowSize() {
        return this.$store.state.global.windowSize;
      },
      image () {
        return this.windowSize.width > 760 ? this.horizontalImage : this.verticalImage;
      }
    }
  });
</script>

<style lang="scss">
  @import '../../../../assets/styles/ui';
  .stay-home {
    position: relative;
    display: flex;
    justify-content: center;
    &__image {
      width: 100%;
      height: 100%;
    }
  }
  .stay-home-text-wrapper {
    position:absolute;
    top: 33%;
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
    padding: 0.75rem 1.5rem;
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