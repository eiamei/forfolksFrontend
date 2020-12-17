<template>
  <transition name="fade">
    <div v-if="isVisible" class="item-care-instruction-wrapper">
      <section class="item-care-instruction">
        <h2 class="item-care-instruction__heading">{{ item.care.header}}</h2>
        <p class="regular-sans-text item-care-instruction__text" v-html="item.care.text"></p>
        <button class="clean-button item-care-instruction__close-button" @click="close">
          <plus-icon/>
        </button>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from "vue";
  import PlusIcon from "../../../components/Icons/Plus.vue";
  import {ItemInterface} from "../../../services/Store/Shop/shop.types";

  interface Props {
    item: ItemInterface;
    isVisible: Boolean;
  }

  interface Methods {
    close(): void;
  }

  export default Vue.extend<any, Methods, any, Props>({
    name: 'ItemCare',
    components: {PlusIcon},
    props: {
      item: {
        type: Object as () => ItemInterface,
        required: true
      },
      isVisible: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    methods: {
      close () : void {
        this.$emit('close', false);
      }
    }
  })
</script>

<style lang="scss">
  @import "../../../assets/styles/vars";
  @import "../../../assets/styles/ui";
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .item-care-instruction-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba($light-gray,.4);
    @supports (backdrop-filter: blur(4px)) {
      backdrop-filter: blur(4px)
    }
  }
  .item-care-instruction {
    position: relative;
    max-width: 30rem;
    padding: 1rem;
    background-color: white;
    &__heading {
      margin: 0 0 1rem 0;
    }
    &__close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      transform: rotate(45deg);
      cursor: pointer;
      .plus-icon {
        width: 16px;
        height: 16px;
      }
    }
    .item-care-instruction__text.regular-sans-text {
      text-transform: none;
    }
  }
</style>