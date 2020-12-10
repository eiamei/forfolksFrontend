<template>
  <ul class="color-picker">
    <li v-for="color in colors" :class="computeClass(color)" :title="color" :key="color">
      <router-link style="display: flex; width: 1rem; height: 1rem;" :to="createLink(color)"></router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Color, Link} from "../global";
  import {ItemInterface} from "../services/Store/Shop/shop.types";
  import { productLinkBuilder } from '../utils/linkBuilder';
  
  export default Vue.extend({
    name: 'colorPicker',
    props: {
      item: {
        type: Object as () => ItemInterface,
        required: true
      }
    },
    computed: {
      colors(): Array<Color> {
        return this.$store.getters['shop/findItemColors'](this.item);
      },
      current(): Color {
        return this.$store.getters['shop/findItemCurrentColor'](this.item);
      }
    },
    methods: {
      computeClass(color): Array<string> {
        const colors = ['color-picker__circle', `color-picker__circle--${color}`]
        if (color === this.current) colors.push('color-picker__circle--selected')
        return colors;
      },
      createLink(color): Link {
        let link: Link = `/product/${this.item.rootPath}`;
        this.item.selectableProperty
          .forEach(function (property): void {
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
    height: 20px;

    &__circle {
      position: relative;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border: 1px solid black;
      border-radius: 16px;
      cursor: pointer;

      &--selected {
        &::after {
          content: ' ';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          border-radius: 8px;
          transform: translate(-50%, -50%);
          background: white;
          border: 1px solid black;
        }
      }

      &--white, &--white42cm {
        background: $coated;
      }

      &--silver {
        background: $silver;
      }

      &--cream, &--unbleached, &--beige42cm {
        background: $cream;
      }

      &--light-gray {
        background: $light-gray-cloth;
      }

      &--mint {
        background: $mint;
      }

      &--natural-linen {
        background: $natural-linen;
      }

      &--blue-line {
        background: $blue-line;
      }

      &--pearl, &--milk {
        background: $pearl;
      }

      &--sand {
        background: $sand;
      }

      &--darkblue {
        background: $darkblue;
      }

      &--olive, &--green {
        background: $olive;
      }

      &--terracotta, &--brown, &--bordeaux42cm {
        background: $terracotta;
      }

      &--powder, &--peach, &--figs, &--powder42cm {
        background: $powder;
      }

      &--cacao, &--cocoa, &--coffee {
        background: $cacao;
      }

      &--chestnut {
        background: $chestnut;
      }

      &--jupiter {
        background: $jupiter;
      }

      &--neptun {
        background: $neptun;
      }

      &--moonstone {
        background: $moonstone;
      }

      &--gray-fog, &--fog {
        background: $gray_fog;
      }

      &--gray {
        background: $gray;
      }

      &--graphite, &--dark-gray {
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