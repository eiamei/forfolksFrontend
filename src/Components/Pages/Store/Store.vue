<template>
  <div class="store">
    <span class="store-row">
      <card :item="store[0]" :key="store[0].name" :width="windowWidth * 0.6924" :height="windowWidth * 2/5"/>
      <card :item="store[1]" :key="store[1].name" :width="windowWidth * 0.3076" :height="windowWidth * 2/5"/>
    </span>
    <span class="store-row">
      <span>
        <card :item="store[2]" :width="windowWidth * 0.3333" :height="windowWidth * 2/5"/>
        <card :item="store[3]" :width="windowWidth * 0.3333" :height="windowWidth * 2/5"/>
      </span>
      <card :item="store[4]" :width="windowWidth * 0.6666" :height="windowWidth * 4/5"/>
    </span>
    <span class="store-row">
      <card :item="store[5]" :key="store[0].name" :width="windowWidth * 0.6924" :height="windowWidth * 2/5"/>
      <card :item="store[6]" :key="store[1].name" :width="windowWidth * 0.3076" :height="windowWidth * 2/5"/>
    </span>
    <span class="store-row">
      <card :item="store[7]" :key="store[1].name" :width="windowWidth * 0.3076" :height="windowWidth * 2/5"/>
      <card :item="store[8]" :key="store[0].name" :width="windowWidth * 0.6924" :height="windowWidth * 2/5"/>
    </span>
    <span class="store-row">
      <card :item="store[9]" :key="store[0].name" :width="windowWidth * 0.6924" :height="windowWidth * 2/5"/>
      <card :item="store[10]" :key="store[1].name" :width="windowWidth * 0.3076" :height="windowWidth * 2/5"/>
    </span>
    <span class="store-row">
      <card :item="store[11]" :key="store[1].name" :width="windowWidth * 0.3076" :height="windowWidth * 2/5"/>
      <card :item="store[12]" :key="store[0].name" :width="windowWidth * 0.6924" :height="windowWidth * 2/5"/>
    </span>
  </div>
</template>

<script>
  import Card from './StoreCard';
  import Store from '../../../Core/Constants/Store'
  export default {
    name: 'Store',
    components: { Card },
    data () {
      return {
        store: Store
      }
    },
    computed: {
      windowWidth () {
        return this.$store.state.global.windowSize.width;
      }
    },
    watch: {
      windowWidth () {
        this.resizeHandler();
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.resizeHandler();
      });
    },
    updated () {
      this.resizeHandler();
    },
    methods: {
      resizeHandler () {}
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  .store {
    width: 100%;
  }
  .store-row {
    width: 100%;
    display: flex;
    position: relative;
    /*flex-direction: column;*/
    /*flex-wrap: nowrap;*/
    /*width: 1000px!important;*/
  }
</style>