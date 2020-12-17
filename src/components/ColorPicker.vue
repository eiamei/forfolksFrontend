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

<style>
  .color-picker {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 20px;
  }
  .color-picker__circle {
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border: 1px solid black;
    border-radius: 16px;
    cursor: pointer;
  }
  .color-picker__circle--selected::after {
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
  .color-picker__circle--white, .color-picker__circle--white42cm {
    background: #FFFDF6;
  }
  .color-picker__circle--silver {
    background: #e3e9ee;
  }
  .color-picker__circle--cream, .color-picker__circle--unbleached, .color-picker__circle--beige42cm {
    background: #fcedce;
  }
  .color-picker__circle--light-gray {
    background: var(--light-gray)-cloth;
  }
  .color-picker__circle--mint {
    background: #d5e4dd;
  }
  .color-picker__circle--natural-linen {
    background: #ddd8cd;
  }
  .color-picker__circle--blue-line {
    background: linear-gradient(145deg, #FFF 35%, #c7c8eb 51.56%, #FFF 65%);
  }
  .color-picker__circle--pearl, .color-picker__circle--milk {
    background: #eee5d2;
  }
  .color-picker__circle--sand {
    background: #e2cd9e;
  }
  .color-picker__circle--darkblue {
    background: #3d5566;
  }
  .color-picker__circle--olive, .color-picker__circle--green {
    background: #677e65;
  }
  .color-picker__circle--terracotta, .color-picker__circle--brown, .color-picker__circle--bordeaux42cm {
    background: #d36438;
  }
  .color-picker__circle--powder, .color-picker__circle--peach, .color-picker__circle--figs, .color-picker__circle--powder42cm {
    background: #e9d8d8;
  }
  .color-picker__circle--cacao, .color-picker__circle--cocoa, .color-picker__circle--coffee {
    background: #d4c0af;
  }
  .color-picker__circle--chestnut {
    background: #f0bc84;
  }
  .color-picker__circle--jupiter {
    background: linear-gradient(180deg, #d4c0af 35%, #FFF 51.56%, #d4c0af 65%);
  }
  .color-picker__circle--neptun {
    background: linear-gradient(180deg, #afc2d4 35%, #FFF 51.56%, #afc2d4 65%);
  }
  .color-picker__circle--moonstone {
    background: #d1e0eb;
  }
  .color-picker__circle--gray-fog, .color-picker__circle--fog {
    background: linear-gradient(180deg, #FFFFFF 34.31%, #7B7A7A 76.92%);
  }
  .color-picker__circle--gray {
    background: #7B7A7A;
  }
  .color-picker__circle--graphite, .color-picker__circle--dark-gray {
    background: #554d4f;
  }
  .color-picker__circle--black-marble {
    background: linear-gradient(145deg, #FFF 35%, #000 51.56%, #FFF 65%);
  }
  .color-picker__circle--black {
    background: black;
  }

</style>