<template>
  <ul class="color-picker">
    <li v-for="color in colors" :class="computeClass(color)" :title="color" :key="color"></li>
  </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Color } from "../global";

    export default Vue.extend({
        props: {
            colors: {
                type: Array as () => Array<Color>,
                required: true
            },
            current: {
                type: String as () => Color,
                required: false
            }
        },
        methods: {
            computeClass (color) : Array<string> {
                const colors =  ['color-picker__circle', `color-picker__circle--${color}`]
                if (color === this.current) colors.push('color-picker__circle--selected')
                return colors;
            }
        }
    })
</script>

<style lang="scss">
  @import '../assets/styles/vars';
  .color-picker {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    &__circle {
      position: relative;
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      border: 1px solid black;
      border-radius: 1rem;
      cursor: pointer;
      &--selected {
        &::after {
          content: ' ';
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 0.5rem;
          transform: translate(-50%, -50%);
          background: white;
          border: 1px solid black;
        }
      }
      &--white {
        background: $coated;
      }
      &--powder {
        background: $powder;
      }
      &--moonstone {
        background: $moonstone;
      }
      &--gray-fog {
        background: $gray_fog;
      }
      &--graphite {
        background: $graphite;
      }
      &--black-marble {
        background: $black-marble;
      }
      &--black {
        background: $black;
      }
    }
  }
</style>