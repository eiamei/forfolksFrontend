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
  @import '../../../assets/styles/_colors';
  .button {
    cursor: pointer;
    &--menu {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid black;
      font-size: 16px;
    }
    &--item-selection {
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px solid black;
      font-size: 12px;
      background: transparent;
      @media screen and (max-width: 600px) {
        font-size: 12px!important;
      }
    }
    &--add-to-cart {
      background: #353535;
      border: 1px solid #000000;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 8px 48px;
      font-size: 20px;
      color: white;
      width: 300px;
      font-weight: 700;
      @media screen and (max-width: 600px) {
        width: 100%;
        font-size: 12px;
      }
    }
  }
</style>