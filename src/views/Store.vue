<template>
  <section style="min-height: 101vh">
    <section class="store" :key="counter">
      <store-card v-for="(item, index) in items" :width="item.width" :height="item.height"  :item="item" @isWide="isWide => safeRatio(index, isWide)" :key="createKey(item)"/>
    </section>
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
      if (this.loadCounter === this.items.length)
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
    }
  },
  mounted () {
    setTimeout(() => {
      this.containerWidth = this.$el.offsetWidth;
      if (this.loadCounter === this.items.length)
        this.createMap();
    }, 1)
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
      let dif = 5;
      for (let i = 0, len = this.items.length; i < len;) {
        if ((i + 2) < len && !this.widesMap[i] && !this.widesMap[i + 1] && this.widesMap[i + 2]) {
          this.items[i].width = this.items[i + 1].width = this.containerWidth / 2 - dif;
          this.items[i].height = this.items[i + 1].height = this.containerWidth / 4  * 3 - dif;
          i += 2;
          continue;
        }
        if ((i + 2) < len && !this.widesMap[i] && !this.widesMap[i + 1] && !this.widesMap[i + 2]) {
          this.items[i].width = this.items[i + 1].width = this.items[i + 2].width = this.containerWidth / 3 - dif;
          this.items[i].height = this.items[i + 1].height = this.items[i + 2].height = this.containerWidth / 2 - dif;
          i += 3;
          continue;
        }
        if (this.widesMap[i] && (i + 1) < len && this.widesMap[i + 1]) {
          this.items[i].width = this.items[i + 1].width = this.containerWidth / 2 - dif;
          this.items[i].height = this.items[i + 1].height = this.containerWidth / 3 - dif;
          i += 2;
          continue;
        }
        if (this.widesMap[i] && (i + 1) < len && !this.widesMap[i + 1]) {
          this.items[i].width = this.containerWidth / 3 * 2 - dif;
          this.items[i].height = this.containerWidth / 2 - dif;
          this.items[i + 1].width = this.containerWidth / 3 - dif;
          this.items[i + 1].height = this.containerWidth / 2 - dif;
          i += 2;
          continue;
        }
        if (!this.widesMap[i] && (i + 1) < len && this.widesMap[i + 1]) {
          this.items[i].width = this.containerWidth / 3 - dif;
          this.items[i].height = this.containerWidth / 2 - dif;
          this.items[i + 1].width = this.containerWidth / 3 * 2 - dif;
          this.items[i + 1].height = this.containerWidth / 2 - dif;
          i += 2;
          continue;
        }
        if (this.widesMap[i]) {
          this.items[i].width = this.containerWidth - dif;
          this.items[i].height = this.containerWidth / 3 * 2 - dif;
        }
        if (!this.widesMap[i]) {
          this.items[i].width = this.containerWidth / 3 - dif;
          this.items[i].height = this.containerWidth / 2 - dif;
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
    /*min-height: 101vh;*/
    display: flex;
    flex-wrap: wrap;
  }
</style>