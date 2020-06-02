<template>
  <main class="item-card">
    <div style="display:flex;">
      <item-photos :images="images"/>
      <item-side-bar :item="item"/>
    </div>
  </main>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ItemPhotos from './components/ItemPhotos.vue';
    import ItemSideBar from './components/ItemSideBar.vue';
    import { ItemInterface } from "@/services/Store/Shop/Shop.types";
    import {Color, link} from "@/global";

    export default Vue.extend({
        components: {ItemPhotos, ItemSideBar},
        computed: {
            item () : ItemInterface {
                return this.$store.getters['shop/findItemByParam'](this.$route.params);
            },
            images () : Array<link> {
                return this.$store.getters['shop/findItemImages'](this.item);
            }
        }
    })
</script>

<style>
  .item-card {
    margin-top: 3rem;
  }
</style>