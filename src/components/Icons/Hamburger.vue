<template>
  <svg viewBox="0 0 32 12" class="hamburger-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect class="hamburger-icon__first-line" y="10" width="32" height="2" fill="#333F48"/>
    <rect class="hamburger-icon__second-line" width="32" height="2" fill="#333F48"/>
  </svg>
</template>

<script type="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'HamburgerIcon'
  })
</script>

<style lang="scss">
  .hamburger-icon {
    width: 32px;
    height: 12px;
    &__first-line, &__second-line {
        transition: transform 0.3s, fill 0.3s;
        transform-origin: 50% 50%;
        transform: rotate(0);
        &:focus {
          fill:red;
        }
    }
    &--cross {
      .hamburger-icon__first-line {
        animation: rotate45 0.4s;
        transform: rotate(45deg);
      }
      .hamburger-icon__second-line {
        animation: rotateminus45 0.4s;
        transform: rotate(-45deg);
      }
    }
  }
</style>