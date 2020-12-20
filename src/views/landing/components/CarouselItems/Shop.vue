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

<style>
  .basic-carousel-item {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    padding: 0 16px;
  }
  @media screen and (max-width: 764px) {
    .basic-carousel-item {
      flex-direction: column;
      justify-content: start;
    }
  }
  .basic-carousel-item__image {
    width: 50%;
    object-fit: cover;
  }
  @media screen and (max-width: 764px) {
    .basic-carousel-item__image {
      width: 100%;
      max-height: 55%;
    }
  }
  .basic-carousel-item__heading {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  @media screen and (max-width: 764px) {
    .basic-carousel-item__heading {
      margin-top: 16px;
      align-content: center;
    }
  }
  .basic-carousel-item__heading-text.big-serif-heading {
    margin: 0;
    align-self: flex-end;
  }
  @media screen and (max-width: 764px) {
    .basic-carousel-item__heading-text.big-serif-heading {
      align-self: center;
    }
  }
  .basic-carousel-item__sub-heading-text {
    align-self: flex-end;
  }
  @media screen and (max-width: 764px) {
    .basic-carousel-item__sub-heading-text {
      align-self: center;
    }
  }
  .basic-carousel-item__action-button.regular-link {
    align-self: flex-end;
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid var(--dark-blue);
    color: var(--dark-blue);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    text-decoration: none;
    text-transform: none;
  }
  @media screen and (max-width: 764px) {
    .basic-carousel-item__action-button.regular-link {
      align-self: center;
    }
  }
  .basic-carousel-item__action-button.regular-link:hover {
    background-color: var(--dark-blue);
    color: white;
  }
</style>