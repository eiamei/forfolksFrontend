<!--suppress ALL -->
<template>
  <section class="suggestions">
    <button class="clean-button suggestions__button suggestions__button--left" @click="toLeft">
      <ArrowIcon/>
    </button>
    <hooper class="clean-button suggestions__carousel"
            ref="carousel"
            :settings="hooperSettings"
    >
      <slide v-for="item in items" :key="item.id">
        <item-card :item="item"/>
      </slide>
    </hooper>
    <button class="clean-button suggestions__button suggestions__button--right" @click="toRight">
      <ArrowIcon style="transform: rotate(180deg)"/>
    </button>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Hooper, Slide} from 'hooper';
  import 'hooper/dist/hooper.css';
  import ItemCard from "../components/storeCard/storeCard.vue";
  import ArrowIcon from "../components/Icons/Arrow.vue";
  import {ItemInterface} from "../services/Store/Shop/shop.types";

  export default Vue.extend({
    name: 'Suggestions',
    components: {ItemCard, Hooper, Slide, ArrowIcon},
    props: {
      items: {
        type: Array as () => Array<ItemInterface>
      }
    },
    data () {
      return {
        hooperSettings: {
          wheelControl: false,
          mouseDrag: false,
          infiniteScroll: false,
          trimWhiteSpace: true,
          breakpoints: {
            0: {
              itemsToShow: 1
            },
            450: {
              itemsToShow: 2
            },
            750: {
              itemsToShow: 3
            },
            1200: {
              itemsToShow: 4
            },
            1920: {
              itemsToShow: 5
            }
          }
        }
      }
    },
    methods: {
      toLeft() {
        // @ts-ignore
        this.$refs.carousel.slidePrev();
      },
      toRight() {
        // @ts-ignore
        this.$refs.carousel.slideNext();
      }
    }
  });
</script>

<style lang="scss">
  @import "../assets/styles/ui";
  @import "../assets/styles/vars";

  .suggestions {
    display: flex;

    &__carousel {
      overflow: hidden;
      height: auto;
    }

    &__button {
      cursor: pointer;
      width: 2rem;
      height: 4rem;
      align-self: center;

      &--left {
        margin-right: 1rem!important;
      }
      &--right {
        margin-left: 1rem!important;
      }

      &:focus,
      &:hover {
        path {
          stroke: $orange;
        }
      }
    }
    .hooper-slide {
      display: flex;
      height: auto;
      margin: 0!important;
      padding: 0 8px;
    }
  }
</style>