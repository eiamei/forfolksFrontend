<template>
  <button class="button" @click="$emit('click')">
    {{content}}
    <slot name="default"></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
  props: {
    content: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss">
  @import '../assets/styles/colors';
  .button {
    &--menu {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid black;
    }
    &--item-selection {
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px solid black;
      background: transparent;
    }
    &--add-to-cart, &--end-order {
      background: $blue1;
      border: 1px solid $blue1;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 8px 48px;
      color: white;
      width: 300px;
      font-weight: 700;
      &:hover {
        background: $blue2;
      }
      @media screen and (max-width: 600px) {
        width: 100%;
      }
    }
    &--increment-decrement, &--bag-item-remove {
      border-radius: 40px;
      border: none;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      font-weight: 700;
      color: black;
      margin-right: 8px;
      transition: background-color .5s, color .5s;
    }
    &--increment-decrement {
      background-color: transparent;
      &:hover {
        background-color: $light-green;
        color: black;
      }
    }
    &--bag-item-remove {
      background-color: $lightest-gray;
      &:hover {
        background-color: $light-red;
        color: black;
      }
    }
  }
</style>