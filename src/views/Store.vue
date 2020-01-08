<template>
  <section class="store">
    <store-card v-for="(item, index) in items" :width="item.width" :height="item.height"  :item="item" @isWide="isWide => safeRatio(index, isWide)" :key="index"/>
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
      loadCounter: 0
    }
  },
  computed: {
    items () {
      if (this.$store.state.store.items)
        return this.$store.state.store.items.map(function (item) {
          return {
            ...item,
            width: 0,
            height: 0
          }
        });
      else
        return [];
    },
    windowWidth () {
      return this.$store.state.global.windowSize.width;
    }
  },
  watch: {
    windowWidth () {
      if (this.loadCounter === this.items.length)
        this.createMap();
    }
  },
  methods: {
    safeRatio (index, value) {
      this.widesMap[index] = value;
      this.loadCounter++;
      // todo catch error (image not loaded)
      if (this.loadCounter === this.items.length)
        this.createMap();
    },
    createMap () {
      console.log(this.widesMap);
      for (let i = 0, len = this.items.length; i < len;) {
        if ((i + 2) < len && !this.widesMap[i] && !this.widesMap[i + 1] && !this.widesMap[i + 2]) {
          this.items[i].width = this.items[i + 1].width = this.items[i + 1].width = this.windowWidth / 3 - 4;
          this.items[i].height = this.items[i + 1].height = this.items[i + 1].height = this.windowWidth / 2 - 4;
          i += 3;
          continue;
        }
        if (this.widesMap[i] && (i + 1) < len && this.widesMap[i + 1]) {
          this.items[i].width = this.items[i + 1].width = this.windowWidth / 2 - 4;
          this.items[i].height = this.items[i + 1].height = this.windowWidth / 3 - 4;
          i += 2;
          continue;
        }
        if (this.widesMap[i] && (i + 1) < len && !this.widesMap[i + 1]) {
          this.items[i].width = this.windowWidth / 3 * 2 - 4;
          this.items[i].height = this.windowWidth / 2 - 4;
          this.items[i + 1].width = this.windowWidth / 3 - 4;
          this.items[i + 1].height = this.windowWidth / 2 - 4;
          i += 2;
          continue;
        }
        if (!this.widesMap[i] && (i + 1) < len && this.widesMap[i + 1]) {
          this.items[i].width = this.windowWidth / 3 - 4;
          this.items[i].height = this.windowWidth / 2 - 4;
          this.items[i + 1].width = this.windowWidth / 3 * 2 - 4;
          this.items[i + 1].height = this.windowWidth / 2 - 4;
          i += 2;
          continue;
        }
        if (this.widesMap[i]) {
          this.items[i].width = this.windowWidth - 4;
          this.items[i].height = this.windowWidth / 3 * 2 - 4;
        }
        if (!this.widesMap[i]) {
          this.items[i].width = this.windowWidth / 3 - 4;
          this.items[i].height = this.windowWidth / 2 - 4;
        }
        i++
      }
      this.$forceUpdate()
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