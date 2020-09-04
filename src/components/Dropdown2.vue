<template>
  <section class="drop-down-container">
    <button class="drop-down-button" @blur="close" @click="toggleOpenState">
      <span class="drop-down-button__text">{{$t(`${translateNamespace ? translateNamespace + 's.' : ''}${options[value]}`)}}</span>
    </button>
    <ul :class="dropDownClass" aria-label="submenu" @click="select">
      <li v-for="(option, index) in options" :key="option" :data-index="index">
        {{$t(`${translateNamespace ? translateNamespace + 's.' : ''}${option}`)}}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Dropdown2',
  props: {
    options: {
      type: Array,
      required: true
    },
    translateNamespace: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      required: false,
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    dropDownClass () {
      return [
        'drop-down',
        this.isOpen ? 'drop-down--open' : ''
      ]
    }
  },
  methods: {
    toggleOpenState () {
      this.isOpen = !this.isOpen;
    },
    close () {
      this.isOpen = false;
    },
    select (event) {
      if (event.target.attributes['data-index'] && event.target.attributes['data-index'].value)
        this.$emit('input', +event.target.attributes['data-index'].value)
    }
  }
};
</script>

<style lang="scss">
  @import "../assets/styles/colors";
  .drop-down-container {
    position: relative;
    display: flex;
    align-items: center;
    .drop-down-button {
      margin: 0 8px 0 12px;
      color: white;
      background: none;
      outline: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      &__text {
        font-size: 24px;
        margin: 0;
      }
    }
    .drop-down {
      position: absolute;
      opacity: 0;
      background: white;
      box-shadow: 5px 5px 10px rgba(20, 20, 27, 0.44);
      min-width: 5rem;
      transition: opacity .3s ease;
      bottom: 40px;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        padding: 8px;
        background-color: white;
        transition: background-color .3s ease;
        &:hover {
          background-color: $dusty-rose;
        }
      }
      &--open {
        opacity: 1;
      }
    }
  }
</style>