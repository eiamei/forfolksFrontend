<template>
  <section>
    <header>{{heading}}</header>
    <nav>
      <button>&lt;</button>
      <store-card v-for="item in items" :item="item" :height="450" :width="300"/>
<!--      <router-link v-for="item in items" :to="createPath(item)">{{item}}</router-link>-->
      <button>&gt;</button>
    </nav>
  </section>
</template>

<script>
import StoreCard from './storeCard/StoreCard';
export default {
  name: 'Carousel',
  components: {StoreCard},
  props: {
    heading: {
      type: String,
      required: false,
      default: ""
    },
    items: {
      type: Array,
      required: false,
      default () { return []}
    }
  },
  methods: {
    createPath (item) {
      return '/'
    }
  }
};
</script>

<style scoped>

</style>