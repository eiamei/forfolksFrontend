<template>
  <section class="suggestions">
    <button class="clean-button suggestions__button" @click="toLeft">
      <ArrowIcon/>
    </button>
    <hooper class="clean-button suggestions__carousel"
            ref="carousel"
            :itemsToShow="4"
            :wheelControl="false"
            :mouseDrag="false"
            :infiniteScroll="true"
    >
      <slide v-for="item in allItems" style="margin: 0 8px" :key="item">
        <item-card :item="item" />
      </slide>
    </hooper>
    <button class="clean-button suggestions__button" @click="toRight">
      <ArrowIcon style="transform: rotate(180deg)"/>
    </button>
  </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Hooper, Slide } from 'hooper';
    import 'hooper/dist/hooper.css';
    import ItemCard from "@/components/itemCardV2/ItemCard.vue";
    import ArrowIcon from "@/components/Icons/Arrow.vue";

    export default Vue.extend({
        name: 'Suggestions',
        components: {ItemCard, Hooper, Slide, ArrowIcon},
        data () {
            return {
                baseValue: 1,
                allItems: ['asdasd', '3rkmasd', 'af;kks', '31e8olaa', 'asfl;lxca', 'loijndf', 'cnmxjaf', '8ajkaopsm', 'asfjksfi'],
                firstItem: 0,
            };
        },
        methods: {
            toLeft () {
                // this.$refs.carousel.slidePrev();
            },
            toRight () {
                // this.$refs.carousel.slideNext();
            }
        }
    });
</script>

<style lang="scss">
  @import "../assets/styles/ui";
  @import "../assets/styles/vars";
  .suggestions {
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    grid-column-gap: 1rem;
    &__carousel {
      overflow: hidden;
      height: auto;
    }
    &__button {
      cursor: pointer;
      &:focus,
      &:hover {
        path {
          stroke: $orange;
        }
      }
    }
  }
</style>