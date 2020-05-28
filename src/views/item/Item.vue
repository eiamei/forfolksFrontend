<template>
  <main class="item-card">
    <div>
      <item-photos/>
      <item-side-bar/>
    </div>
  </main>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ItemPhotos from './components/ItemPhotos.vue';
    import ItemSideBar from './components/ItemSideBar.vue';

    export default Vue.extend({
        components: {ItemPhotos, ItemSideBar},
        created () {
            this.init();
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