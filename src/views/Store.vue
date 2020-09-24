<template>
  <ul class="store" :key="counter">
    <store-card v-for="(item) in items" :item="item" :key="createKey(item)"/>
  </ul>
</template>

<script>
import StoreCard from '../components/storeCard/storeCard';
import ForfolksLogo from '../components/Icons/Logo';
import { shuffle } from '../utils/shuffle';

export default {
  name: 'Store',
  components: {/*ForfolksLogo,*/ StoreCard},
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
      return shuffle(
        this.storeItems
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
      );
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
  .store-loading {
    position: absolute;
    width: 10rem;
    top: 45vh;
    left: 50%;
    transform: translate(-50%, -50%);
    @keyframes bounce {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.9);
      }
    }
    &__logo {
      animation: bounce 2s ease-in infinite;
    }
  }
  .store {
    display: grid;
    grid-gap: 1.5rem;
    grid-template-columns: repeat( auto-fit, minmax( 20rem, 0.35fr ) );
    grid-auto-flow: dense;
    margin: 3.5rem 0 1.5rem 0;
    padding: 0 1rem;
    min-height: 80vh;
    @media screen and (max-width: $tablet) {
      grid-template-columns: repeat( auto-fit, minmax( 17rem, 1fr ) );
    }
  }

</style>