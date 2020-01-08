<template>
  <section class="item-bottom-menu">
    <section class="item-bottom-menu__container">
      <section style="display: flex">
        <h2 class="item-bottom-menu__model">{{item.name}}</h2>
        <button class="item-bottom-menu__info-button" @click="toggleInfo">
          <img src="../../assets/svg/info.svg" class="bottom-menu__info-icon">
        </button>
      </section>
      <section v-for="prop in properties" :key="prop.name + prop.selected" class="item-bottom-menu__color">
        <p class="item-bottom-menu__color-text">{{$t(`common.${prop.name}`)}}:</p>
        <dropdown2 :options="prop.values" :value="prop.selected" @input="index => changeProduct(prop.name, prop.propertyIndex, index)" :translate-namespace="prop.name"/>
      </section>
    </section>
    <section class="item-bottom-menu__container item-bottom-menu__buy">
      <p class="item-bottom-menu__price">{{item.itemProperty.price}}&thinsp;Р</p>
      <button class="item-bottom-menu__add-button" @click="addToBag">В корзину</button>
    </section>
  </section>
</template>

<script>
import Dropdown2 from '../../Core/Components/UI/Dropdown2';
import slugify from 'slugify';
export default {
  name: 'ItemCardMenu',
  components: {Dropdown2},
  props: {
    item: {
      type: Object,
      required: true
    },
    storeItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    properties () {
      let sameGroupItems = this.storeItems.filter(item => {
        return this.item.rootPath === item.rootPath;
      });
      if (sameGroupItems) {
        let properties = {}
        sameGroupItems.forEach((item, itemIndex) => {
          item.selectableProperty.forEach((property, propertyIndex) => {
            if (!properties[property.name]) properties[property.name] = {
              name: property.name,
              values: [],
              selected: 0,
              propertyIndex: propertyIndex
            };
            if (this.item.selectableProperty[propertyIndex].value === property.value)
              properties[property.name].selected = itemIndex;
            properties[property.name].values.push(property.value);
          })
        });
        return properties;
      }
      return {}
    }
  },
  methods: {
    toggleInfo () {
      this.$emit('toggleInfo')
    },
    addToBag () {

    },
    changeProduct (name, propertyIndex, index) {
      let value = this.properties[name].values[index];
      let nextItem = this.storeItems.find(item => {
        return this.item.rootPath === item.rootPath && item.selectableProperty[propertyIndex].value === value
      });
      if (nextItem) {
        let path = nextItem.rootPath;
        if (nextItem.selectableProperty.length)
          nextItem.selectableProperty.forEach(property => {
            path += `/${slugify(property.value.toLowerCase())}`
          });
        this.$router.push(`/product/${path}`)
      }
      // todo add error if item not found
    }
  }
};
</script>

<style lang="scss">

  .item-bottom-menu {
    position: fixed;
    bottom: 0;
    left: 16px;
    display: flex;
    align-items: center;
    width: calc(100% - 32px);
    justify-content: space-between;
    &__container {
      display: flex;
      align-items: center;
    }
    &__model {
      color: white;
      font-size: 48px;
      margin: 0;
      font-family: 'Playfair Display', serif;
    }
    &__info-button {
      margin: 8px 0 0 16px;
      background: transparent;
      border: none;
      transition: .3s all;
      &:hover {
        transform: scale(1.1);
      }
    }
    &__info-icon {
      width: 36px;
      height: 36px;
    }
    &__color {
      margin: 8px 0 0 16px;
      display: flex;
    }
    &__color-text {
      margin: 0;
      font-size: 24px;
      color: white;
      font-weight: 300;
    }
    &__color-dropdown {
      .dropdown-selected {
        font-size: 24px;
        color: white;
        font-weight: 700;
        margin: 4px 0 0 8px;
        .dropdown__shevron {
          margin-top: 6px;
          path {
            stroke: white;
          }
        }
      }
    }
    &__buy {
      margin-top: 8px;
    }
    &__price {
      color: white;
      font-weight: bold;
      font-size: 24px;
      margin-right: 24px;
    }
    &__add-button {
      color: black;
      font-size: 24px;
      font-weight: bold;
      padding: 8px 36px;
      background: white;
      border: white;
      outline: transparent;
    }
  }
</style>