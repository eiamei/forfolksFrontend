<template>
  <div class="item-photos">
    <img width="100%" :src="image" v-for="image in images" :key="image">
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { link } from "@/global";

    export default Vue.extend({
        props: {
            images: {
                type: Array as () => Array<link>,
                required: true
            }
        }
    })
</script>

<style lang="scss">
  @import '../../../assets/styles/vars';
  .item-photos {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
  }
</style>