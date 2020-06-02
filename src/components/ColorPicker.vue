<template>
  <ul class="color-picker">
    <li v-for="color in colors" :class="computeClass(color)" :title="color" :key="color">
      <router-link style="display: flex; width: 1rem; height: 1rem;" :to="createLink(color)"></router-link>
    </li>
  </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Color, Link } from "../global";
    import {ItemInterface} from "@/services/Store/Shop/shop.types";

    export default Vue.extend({
        props: {
            item: {
                type: Object as () => ItemInterface,
                required: true
            }
        },
        computed: {
            colors () : Array<Color> {
                return this.$store.getters['shop/findItemColors'](this.item);
            },
            current () : Color {
                return this.$store.getters['shop/findItemCurrentColor'](this.item);
            }
        },
        methods: {
            computeClass (color) : Array<string> {
                const colors =  ['color-picker__circle', `color-picker__circle--${color}`]
                if (color === this.current) colors.push('color-picker__circle--selected')
                return colors;
            },
            createLink (color) : Link {
                let link : Link = `/product/${this.item.rootPath}`;
                this.item.selectableProperty
                    .forEach(function (property) : void {
                        if (property.name === 'color') link += `/${color}`
                        else link += `/${property.value}`
                    })
                return link;
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