<template>
  <main class="item-card">
    <div class="item-first-row">
      <item-photos :images="images"/>
      <item-side-bar :item="item"/>
    </div>
    <div class="item-second-row">
      <item-description :item="item"/>
      <item-more-info :item="item" @open="toggleCareModalState"/>
    </div>
    <item-care :item="item" :is-visible="isCareModalOpen" @close="toggleCareModalState"/>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import ItemPhotos from './components/ItemPhotos.vue';
  import ItemSideBar from './components/ItemSideBar.vue';
  import {ItemInterface} from "@/services/Store/Shop/Shop.types";
  import {Color, link} from "@/global";
  import ItemDescription from "./components/ItemDescription.vue";
  import ItemMoreInfo from "./components/ItemMoreInfo.vue";
  import ItemCare from "./components/ItemCare.vue";

  interface Data {
    isCareModalOpen: boolean;
  }


  export default Vue.extend<Data, any, any, any>({
    components: {ItemDescription, ItemMoreInfo, ItemPhotos, ItemSideBar, ItemCare},
    data () : Data {
      return {
        isCareModalOpen: false
      }
    },
    computed: {
      item(): ItemInterface {
        return this.$store.getters['shop/findItemByParam'](this.$route.params);
      },
      images(): Array<link> {
        return this.$store.getters['shop/findItemImages'](this.item);
      }
    },
    methods: {
      toggleCareModalState (state : boolean) : void {
        this.isCareModalOpen = state;
      }
    }
  })
</script>

<style lang="scss">
  @import '../../assets/styles/vars';

  .item-card {
    margin-top: 3rem;
    position: relative;
  }

  .item-first-row {
    display: flex;
    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }
  }

  .item-second-row {
    display: flex;
    background: $soft-yellow-background;
    margin-top: 2rem;
    @media screen and (max-width: $tablet) {
      margin: 0;
      flex-direction: column;
    }
  }
</style>