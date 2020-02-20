<template>
  <section class="store" :key="counter">
    <store-card v-for="(item, index) in items" :width="item.width" :height="item.height"  :item="item" @isWide="isWide => safeRatio(index, isWide)" :key="createKey(item)"/>
  </section>
</template>

<script>
import StoreCard from '../components/storeCard/StoreCard';

export default {
  name: 'Store',
  components: {StoreCard},
  data () {
    return {
      widesMap: {},
      loadCounter: 0,
      type: '',
      counter: 0
    }
  },
  created () {
    this.type = this.$route.params.type;
  },
  watch: {
    windowWidth () {
      if (this.loadCounter === this.items.length)
        this.createMap();
    },
    '$route.params.type' (value) {
      this.loadCounter = 0;
      this.counter++;
      this.type = value;
    }
  },
  computed: {
    storeItems () {
      return this.$store.state.store.items || [];
    },
    items () {
      return this.shuffle(this.storeItems.map(item => {
        if (this.type === 'all' || item.category.includes(this.type))
          return {
            ...item,
            width: 0,
            height: 0
          };
      }).filter(function (item) { return item }));
    },
    windowWidth () {
      return this.$store.state.global.windowSize.width;
    }
  },
  methods: {
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
    safeRatio (index, value) {
      this.widesMap[index] = value;
      this.loadCounter++;
      // todo catch error (image not loaded)
      if (this.loadCounter === this.items.length)
        this.createMap();
    },
    createKey (item) {
      let key = item.rootPath;
      item.selectableProperty.forEach(property => {
        key += `-${property.value}`
      });
      return key;
    },
    createMap () {
      for (let i = 0, len = this.items.length; i < len;) {
        if ((i + 2) < len && !this.widesMap[i] && !this.widesMap[i + 1] && this.widesMap[i + 2]) {
          this.items[i].width = this.items[i + 1].width = this.windowWidth / 2 - 5;
          this.items[i].height = this.items[i + 1].height = this.windowWidth / 4  * 3 - 5;
          i += 2;
          continue;
        }
        if ((i + 2) < len && !this.widesMap[i] && !this.widesMap[i + 1] && !this.widesMap[i + 2]) {
          this.items[i].width = this.items[i + 1].width = this.items[i + 2].width = this.windowWidth / 3 - 5;
          this.items[i].height = this.items[i + 1].height = this.items[i + 2].height = this.windowWidth / 2 - 5;
          i += 3;
          continue;
        }
        if (this.widesMap[i] && (i + 1) < len && this.widesMap[i + 1]) {
          this.items[i].width = this.items[i + 1].width = this.windowWidth / 2 - 5;
          this.items[i].height = this.items[i + 1].height = this.windowWidth / 3 - 5;
          i += 2;
          continue;
        }
        if (this.widesMap[i] && (i + 1) < len && !this.widesMap[i + 1]) {
          this.items[i].width = this.windowWidth / 3 * 2 - 6;
          this.items[i].height = this.windowWidth / 2 - 5;
          this.items[i + 1].width = this.windowWidth / 3 - 5;
          this.items[i + 1].height = this.windowWidth / 2 - 5;
          i += 2;
          continue;
        }
        if (!this.widesMap[i] && (i + 1) < len && this.widesMap[i + 1]) {
          this.items[i].width = this.windowWidth / 3 - 5;
          this.items[i].height = this.windowWidth / 2 - 5;
          this.items[i + 1].width = this.windowWidth / 3 * 2 - 6;
          this.items[i + 1].height = this.windowWidth / 2 - 5;
          i += 2;
          continue;
        }
        if (this.widesMap[i]) {
          this.items[i].width = this.windowWidth - 5;
          this.items[i].height = this.windowWidth / 3 * 2 - 5;
        }
        if (!this.widesMap[i]) {
          this.items[i].width = this.windowWidth / 3 - 5;
          this.items[i].height = this.windowWidth / 2 - 5;
        }
        i++
      }
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss">
  .store {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>