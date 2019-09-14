<template>
  <section style="width: 50px;">
    <span class="header-menu">
      <section style="display: flex">
        <template v-if="!isOpen">
          <app-button class="header-menu__button" @click="open">
            <template slot="content">
              <div class="header-menu__circle"></div>
              <div class="header-menu__circle"></div>
              <div class="header-menu__circle"></div>
            </template>
          </app-button>
          <p class="header-menu__text">Горшки</p>
        </template>
        <template  v-if="isOpen">
          <app-button class="header-menu__button" v-if="isOpen" @click="close">
            <template slot="content">
              <p>X</p>
            </template>
          </app-button>
        </template>
      </section>
      <nav style="position: absolute" v-if="isOpen">
        <ul>
          <li><router-link :to="'store/all'">Все</router-link></li>
        </ul>
      </nav>
    </span>
  </section>
</template>

<script>
  import AppButton from '../UI/AppButton';
  export default {
    name: 'appHeaderMenu',
    components: {AppButton},
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      open () {
        this.isOpen = true;
      },
      close () {
        this.isOpen = false;
      }
    }
  };
</script>

<style lang="scss">

  .header-menu {
    position: absolute;

    &__button {
      display: flex;
      background-color: transparent;
      border: none;
    }
    &__circle {
      width: 12px;
      height: 12px;
      background-color: white;
      border-radius: 8px;
      margin-right: 4px;
    }
    &__text {
      color: white;
    }
  }
</style>