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
    cursor: pointer;
    outline: transparent;
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
    &--add-to-cart, &--end-order {
      background: $blue1;
      border: 1px solid $blue1;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 8px 48px;
      font-size: 20px;
      color: white;
      width: 300px;
      font-weight: 700;
      &:hover {
        background: $blue2;
      }
      @media screen and (max-width: 600px) {
        width: 100%;
        font-size: 12px;
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
      font-size: 16px;
      margin-right: 8px;
      transition: .5s all;
      outline: transparent;
    }
    &--increment-decrement {
      background-color: transparent;
      &:hover {
        transition: .5s all;
        background-color: $light-green;
        color: black;
      }
    }
    &--bag-item-remove {
      background-color: $lightest-gray;
      &:hover {
        transition: .5s all;
        background-color: $light-red;
        color: black;
      }
    }
  }
</style>