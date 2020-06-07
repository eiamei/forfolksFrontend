<template>
  <ul class="store" :key="counter">
    <store-card v-for="(item) in items" :item="item" :key="createKey(item)"/>
  </ul>
</template>

<script>
import StoreCard from '../components/storeCard/storeCard';
import ForfolksLogo from '../components/Icons/Logo';

export default {
  name: 'Store',
  components: {/*ForfolksLogo,*/ StoreCard},
  data () {
    return {
      widesMap: {},
      loadCounter: 0,
      type: null,
      material: null,
      counter: 0,
      containerWidth: 0
    }
  },
  created () {
    this.type = this.$route.params.type || null;
    this.material = this.$route.params.material || null;
  },
  watch: {
    windowWidth () {
      this.containerWidth = this.$el.offsetWidth;
      if (this.isLoaded)
        this.createMap();
    },
    '$route.params.type' (value) {
      this.loadCounter = 0;
      this.counter++;
      this.type = value;
    },
    '$route.params.material' (value) {
      this.loadCounter = 0;
      this.counter++;
      this.material = value;
    }
  },
  computed: {
    storeItems () {
      return this.$store.state.store.items || [];
    },
    items () {
      return this.shuffle(this.storeItems.map(item => {
        if (this.type !== null && (this.type === 'all' || item.category.includes(this.type)))
          return {
            ...item,
            width: 0,
            height: 0
          };
        else if (this.material !== null && item.itemProperty.material.includes(this.material))
          return {
            ...item,
            width: 0,
            height: 0
          };
      }).filter(function (item) { return item }));
    },
    windowWidth () {
      return this.$store.state.global.windowSize.width;
    },
  },
  methods: {
    // TODO move to VUEX getters
    shuffle (array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
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
    grid-gap: 1.5rem; /* [1] Add some gap between rows and columns */
    grid-template-columns: repeat( auto-fit, minmax( 20rem, 1fr ) ); /* [2] Make columns adjust according to the available viewport */
    grid-auto-flow: dense;
    margin: 3.5rem 0 1.5rem 0;
    padding: 0 1rem;
    @media screen and (max-width: $tablet) {
      grid-template-columns: repeat( auto-fit, minmax( 17rem, 1fr ) ); /* [2] Make columns adjust according to the available viewport */
    }
  }

</style>