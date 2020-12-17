<template>
  <ul class="store" :key="counter">
    <store-card v-for="(item) in items" :item="item" :key="createKey(item)"/>
  </ul>
</template>

<script>
import StoreCard from '../components/storeCard/storeCard';

export default {
  name: 'Store',
  components: {StoreCard},
  data () {
    return {
      widesMap: {},
      type: null,
      room: null,
      counter: 0,
      containerWidth: 0
    }
  },
  created () {
    this.type = this.$route.params.type || null;
    this.room = this.$route.params.room || null;
  },
  watch: {
    windowWidth () {
      this.containerWidth = this.$el.offsetWidth;
    },
    '$route.params.type' (value) {
      this.counter++;
      this.type = value;
    },
    '$route.params.room' (value) {
      this.counter++;
      this.room = value;
    }
  },
  computed: {
    storeItems () {
      return this.$store.state.shop.items || [];
    },
    items () {
      return this.storeItems
          .map(item => {
            if (this.type !== null && (this.type === 'all' || item.category.includes(this.type)))
              return {
                ...item,
                width: 0,
                height: 0
              };
            else if (this.room !== null && item.room.includes(this.room))
              return {
                ...item,
                width: 0,
                height: 0
              };
          })
          // show only items that are in stock
          .filter(function (item) {
            return item && item.availability > 0;
          })
    },
    windowWidth () {
      return this.$store.state.global.windowSize.width;
    },
  },
  methods: {
    createKey (item) {
      let key = item.rootPath;
      item.selectableProperty.forEach(property => {
        key += `-${property.value}`
      });
      return key;
    },
  }
};
</script>

<style lang="scss">
  @import '../assets/styles/vars';
  .store {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat( auto-fit, minmax( 350px, 1fr ) );
    grid-auto-flow: dense;
    margin: 3.5rem 1rem 1.5rem 1rem;
    padding: 0;
    // sorry
    // for the good flexing of massonry on small devices
    @media screen and (max-width: 700px) {
      grid-template-columns: repeat( auto-fit, minmax( 250px, 1fr ) );
    }
    @media screen and (max-width: 550px) {
      grid-template-columns: repeat( auto-fit, minmax( 200px, 1fr ) );
    }
    @media screen and (max-width: 450px) {
      grid-template-columns: repeat( auto-fit, minmax( 150px, 1fr ) );
    }
    @media screen and (max-width: 330px) {
      grid-template-columns: repeat( auto-fit, minmax( 100px, 1fr ) );
    }
  }

</style>