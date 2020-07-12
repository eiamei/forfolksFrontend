<template>
  <div class="basic-carousel-item">
    <img class="basic-carousel-item__image" :src="image"/>
    <div class="basic-carousel-item__heading">
      <h1 class="basic-carousel-item__heading-text big-serif-heading">{{heading}}</h1>
      <p class="basic-carousel-item__sub-heading-text">{{subHeading}}</p>
      <router-link class="regular-link regular-sans-text basic-carousel-item__action-button" :to="link">
        {{linkText}}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'BasicInline',
    props: {
      image: {

      },
      heading: {

      },
      subHeading: {

      },
      linkText: {

      },
      link: {

      }
    }
  });
</script>

<style lang="scss">
  @import '../../../../assets/styles/ui';
  @import '../../../../assets/styles/vars';
  .basic-carousel-item {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    padding: 0 16px;
    @media screen and (max-width: $tablet) {
      flex-direction: column;
      justify-content: start;
    }
    &__image {
      width: 50%;
      object-fit: cover;
      @media screen and (max-width: $tablet) {
        width: 100%;
        max-height: 70%;
      }
    }
    &__heading {
      display: flex;
      flex-direction: column;
      align-self: center;
      @media screen and (max-width: $tablet) {
        margin-top: 16px;
        align-content: center;
      }
    }
    &__heading-text.big-serif-heading {
      font-size: 2.5rem;
      margin: 0;
      align-self: flex-end;
      @media screen and (max-width: $tablet) {
        align-self: center;
      }
    }
    &__sub-heading-text {
      align-self: flex-end;
      @media screen and (max-width: $tablet) {
        align-self: center;
        font-size: 10px;
      }
    }
    &__action-button.regular-link {
      align-self: flex-end;
      padding: 1rem;
      margin-top: 1rem;
      border: 1px solid $dark-blue;
      color: $dark-blue;
      line-height: 1;
      cursor: pointer;
      transition: background-color .2s ease-in-out, color .2s ease-in-out;
      text-decoration: none;
      text-transform: none;
      @media screen and (max-width: $tablet) {
        align-self: center;
      }
      &:hover {
        background-color: $dark-blue;
        color: white;
      }
    }
  }
</style>