<template>
  <section class="suggestions">
    <button @click="toLeft">
      <ArrowIcon/>
    </button>
    <hooper ref="carousel" :itemsToShow="3" :wheelControl="false" :mouseDrag="false" :infiniteScroll="true" style="margin: 0 16px; height: auto; width: calc(100% - 152px)">
      <slide v-for="item in allItems" style="margin: 0 8px" :key="item">
        <item-card :item="item" />
      </slide>
    </hooper>
    <button @click="toRight">
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
                this.$refs.carousel.slidePrev();
            },
            toRight () {
                this.$refs.carousel.slideNext();
            }
        }
    });
</script>

<style lang="scss">
  .suggestions {
    display: flex;
    width: 100%;
    &__container {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
  }
</style>