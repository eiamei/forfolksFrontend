<template>
  <div class="store">
    <span class="store-row">
      <card :item="store[0]" :key="store[0].name + store[0].model"/>
      <card :item="store[1]" :key="store[1].name + store[1].model"/>
    </span>
<!--    <span class="store-row">-->
<!--      <card :item="store[0]" :key="store[0].name + store[0].model" :width="windowWidth / 4" :height="windowWidth * 0.33"/>-->
<!--      <card :item="store[1]" :key="store[1].name + store[1].model" :width="windowWidth / 4" :height="windowWidth * 0.33"/>-->
<!--      <card :item="store[3]" :key="store[0].name + store[0].model" :width="windowWidth / 4" :height="windowWidth * 0.33"/>-->
<!--      <card :item="store[4]" :key="store[1].name + store[1].model" :width="windowWidth / 4" :height="windowWidth * 0.33"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[0]" :key="store[0].name + store[0].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--      <card :item="store[1]" :key="store[1].name + store[1].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--      <card :item="store[2]" :key="store[0].name + store[0].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[3]" :key="store[0].name + store[0].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--      <card :item="store[4]" :key="store[1].name + store[1].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--      <card :item="store[5]" :key="store[0].name + store[0].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[6]" :key="store[0].name + store[0].model" :width="windowWidth / 3" :height="windowWidth * 0.5"/>-->
<!--      <card :item="store[11]" :key="store[10].name + store[10].model" :width="windowWidth / 3 * 2" :height="windowWidth * 0.5"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[19]" :key="store[19].name + store[19].model" :width="windowWidth * 1 / 3" :height="windowWidth *  0.4613"/>-->
<!--      <card :item="store[17]" :key="store[17].name + store[17].model" :width="windowWidth * 1 / 3" :height="windowWidth *  0.4613"/>-->
<!--      <card :item="store[18]" :key="store[18].name + store[18].model" :width="windowWidth * 1 / 3" :height="windowWidth *  0.4613"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <span>-->
<!--        <card :item="store[2]" :key="store[2].name + store[2].model" :width="windowWidth * 1 / 3" :height="windowWidth / 2"/>-->
<!--        <card :item="store[3]" :key="store[3].name + store[3].model" :width="windowWidth * 1 / 3" :height="windowWidth / 2"/>-->
<!--      </span>-->
<!--      <card :item="store[4]" :key="store[4].name + store[4].model" :width="windowWidth * 2 / 3" :height="windowWidth"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[5]" :key="store[5].name + store[5].model" :width="windowWidth * 2 / 3" :height="windowWidth * 0.4613"/>-->
<!--      <card :item="store[6]" :key="store[6].name + store[6].model" :width="windowWidth * 1 / 3" :height="windowWidth * 0.4613"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[7]" :key="store[7].name + store[7].model" :width="windowWidth * 1 / 3" :height="windowWidth * 0.4613"/>-->
<!--      <card :item="store[8]" :key="store[8].name + store[8].model" :width="windowWidth * 2 / 3" :height="windowWidth * 0.4613"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[9]" :key="store[9].name + store[9].model" :width="windowWidth" :height="windowWidth * 0.66"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[10]" :key="store[10].name + store[10].model" :width="windowWidth * 2 / 3" :height="windowWidth"/>-->
<!--      <span>-->
<!--        <card :item="store[11]" :key="store[11].name + store[11].model" :width="windowWidth * 1 / 3" :height="windowWidth / 2"/>-->
<!--        <card :item="store[12]" :key="store[12].name + store[12].model" :width="windowWidth * 1 / 3" :height="windowWidth / 2"/>-->
<!--      </span>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[13]" :key="store[13].name + store[13].model" :width="windowWidth * 1 / 3" :height="windowWidth * 0.4613"/>-->
<!--      <card :item="store[14]" :key="store[14].name + store[14].model" :width="windowWidth * 2 / 3" :height="windowWidth * 0.4613"/>-->
<!--    </span>-->
<!--    <span class="store-row">-->
<!--      <card :item="store[15]" :key="store[15].name + store[15].model" :width="windowWidth * 2 / 3" :height="windowWidth * 0.4613"/>-->
<!--      <card :item="store[16]" :key="store[16].name + store[16].model" :width="windowWidth * 1 / 3" :height="windowWidth * 0.4613"/>-->
<!--    </span>-->
  </div>
</template>

<script>
  import Card from '../../storeCard/StoreCard';
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
  }
</style>