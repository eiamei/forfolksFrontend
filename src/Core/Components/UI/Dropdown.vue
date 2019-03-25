<template>
  <div class="dropdown">
    <button class="dropdown-selected" @blur="blur" @click="toggle">
      <slot name="selected" v-bind="selected"/>
      <slot :name="selected.value" v-bind="selected"/>
      <span v-if="!$slots.selected && !$slots[selected.value]">{{$t(`colors.${selected.label}`)}}</span>
      <shevron class="dropdown__shevron" :class="{'dropdown__shevron--open': data.opening}"></shevron>
    </button>
    <div class="dropdown-options" v-if="data.opening">
      <div class="dropdown-options__item" v-if="option.value !== selected.value" v-for="option in options"
           @click="select(option)">
        <slot :name="option.value !== selected.value? option.value : data.selected" v-bind="option"/>
        <slot name="option" v-bind="option"/>
        <div class="dropdown-options__item-label"
             v-if="!$slots.option && !$slots[option.value] && option !== data.selected ">{{$t(`colors.${option.label}`)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Shevron from './Icons/Shevron';
  export default {
    components: {Shevron},
    props: {
      options: {
        type: Array,
        required: false,
        default: () => ([])
      },
      value: {
        required: false,
        default: () => (null)
      },
      opening: {
        required: false,
        default: false
      },
      pendingCloseMs: {
        type: Number,
        required: false,
        default: 1000
      }
    },
    data () {
      const { opening, options } = this;
      return {
        data: {
          opening
        }
      };
    },
    computed: {
      selected () {
        const { value: selectedValue, options } = this;
        if (typeof selectedValue !== 'object' || selectedValue !== null) {
          const findSelected = options.find(
            ({ value, label }) => {
              return value == selectedValue || label == selectedValue;
            }
          );
          if (!findSelected) {
            return { value: null };
          }
          return findSelected;
        }
        return { value: null };
      }
    },
    watch: {
      options () {
        this.initialSelected();
      }
    },
    created () {
      this.initialSelected();
    },
    methods: {
      initialSelected () {
        const first = this.options.length ? this.options[0] : null;
        if (!this.value && first) {
          // this.select(this.options[0]);
        }
      },
      select (option) {
        // this.data.selected = option
        this.$emit('change', option);

        this.close();
      },
      mouseover () {
        if (this.pendingClose)
          clearTimeout(this.pendingClose);
      },
      mouseout () {
        if (this.pendingClose) {
          clearTimeout(this.pendingClose);
        }
        this.pendingClose = setTimeout(() => {
          this.close();
          this.pendingClose = null;
        }, this.pendingCloseMs);
      },
      toggle () {
        this.data.opening = !this.data.opening;
      },
      blur () {
        setTimeout(() => {
          this.close();
        }, 200);
      },
      close () {
        this.data.opening = false;
      }
    }
  };

</script>

<style lang="scss">
  @import "../../../assets/styles/_colors";
  .dropdown {
    position: relative;
    background: inherit;
    &__shevron {
      width: 10px;
      height: 5px;
      stroke-width: 3px;
      margin-top: 2px;
      margin-left: 4px;
      transition: .5s all;
      &--open {
        transform: rotate(-180deg);
        transition: .5s all;
      }
    }
    &-selected {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border: none;
      background: none;
      font-weight: 300;
      font-size: 16px;
      padding: 0;
      color: black;
      outline: none;
    }
    &-options {
      position: absolute;
      z-index: 1000;
      height: auto;
      top: calc(100% + 8px);
      left: 0px;
      background-size: 100% 100%;
      box-shadow: 5px 5px 10px rgba(20, 20, 27, 0.44);
      border-radius: 4px;
      background-color: rgb(255, 255, 255);
      &__item {
        color: black;
        transition: .5s background-color;
        cursor: pointer;
        &:hover {
          transition: .5s background-color;
          background-color: $dusty-rose;
        }
        &-label {
          padding: 8px 8px;
          font-size: 12px;
        }
      }
    }
    @media screen and (max-width: 770px) {

      &__shevron {
        width: 8px;
        height: 5px;
      }
      &-selected {
        font-size: 12px;
      }
      &-options {
        &__item {
          &-label {
            font-size: 12px;
          }
        }
      }
    }
    @media screen and (max-width: 500px) {

      &__shevron {
        width: 8px;
        height: 5px;
      }
      &-selected {
        font-size: 10px;
      }
      &-options {
        &__item {
          &-label {
            font-size: 10px;
          }
        }
      }
    }
  }

</style>
