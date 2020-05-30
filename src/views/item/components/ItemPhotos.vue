<template>
  <div>
    <img :src="image" v-for="image in images">
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

<style scoped>

</style>