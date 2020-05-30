<template>
  <main class="item-card">
    <div style="display:flex;">
      <item-photos :images="item.images"/>
      <item-side-bar/>
    </div>
  </main>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ItemPhotos from './components/ItemPhotos.vue';
    import ItemSideBar from './components/ItemSideBar.vue';
    import {ItemStateInterface} from "@/services/Store/Item/item.types";

    export default Vue.extend({
        components: {ItemPhotos, ItemSideBar},
        created () {
            this.init();
        },
        computed: {
            item () : ItemStateInterface {
                return this.$store.state.item;
            }
        },
        methods: {
            init () {
                this.$store.dispatch('item/init', this.$route.params);
            }
        }
    })
</script>

<style>
  .item-card {
    margin-top: 3rem;
  }
</style>