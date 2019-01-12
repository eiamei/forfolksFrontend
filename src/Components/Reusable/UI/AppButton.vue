<template>
  <button class="button" @click="$emit('click')">
    {{content}}
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    content: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
  .button {
    cursor: pointer;
    &--menu {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid black;
      font-size: 16px;
    }
  }
</style>