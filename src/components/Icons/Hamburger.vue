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

<style>
  .hamburger-icon {
    height: 0.5rem;
  }
  .hamburger-icon__first-line:focus, .hamburger-icon__second-line:focus {
    fill:red;
  }
</style>