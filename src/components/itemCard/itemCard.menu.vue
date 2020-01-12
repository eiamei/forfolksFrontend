<template>
  <section class="item-bottom-menu">
    <section class="item-bottom-menu__container">
      <section style="display: flex">
        <h2 class="item-bottom-menu__model">{{item.name}}</h2>
        <button class="item-bottom-menu__info-button" @click="toggleInfo" title="О товаре">
          <img src="../../assets/svg/info.svg" class="item-bottom-menu__info-icon">
        </button>
      </section>
      <section v-for="prop in properties" :key="prop.name + prop.selected" class="item-bottom-menu__property">
        <p class="item-bottom-menu__property-text">{{$t(`common.${prop.name}`)}}:</p>
        <dropdown2 :options="prop.values" :value="prop.selected" @input="index => changeProduct(prop.name, prop.propertyIndex, index)" :translate-namespace="prop.translateNamespace"/>
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
              propertyIndex: propertyIndex,
              translateNamespace: property.name === 'model' ? '' : property.name
            };
            if (properties[property.name].values.includes(property.value))
              return;
            properties[property.name].values.push(property.value);
            if (this.item.selectableProperty[propertyIndex].value === property.value)
              properties[property.name].selected = itemIndex;
          })
        });
        return properties;
      }
      return {}
    }
  },
  methods: {
    toggleInfo () {
      window.scrollTo(0, 10000);
    },
    addToBag () {
      this.$store.dispatch('bag/add', {
        rootPath: this.item.rootPath,
        name: this.item.name,
        price: this.item.itemProperty.price,
        type: this.item.type,
        props: this.item.selectableProperty
      });
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
    background: rgba(0,0,0,0.3);
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    width: calc(100% - 32px);
    justify-content: space-between;
    z-index: 6;
    &__container {
      display: flex;
      align-items: center;
      @media screen and (max-width: 600px) {
        flex-direction: column;
        align-items: start;
      }
    }
    &__model {
      color: white;
      font-size: 48px;
      margin: 0;
      font-family: 'Playfair Display', serif;
      @media screen and (max-width: 900px) {
        font-size: 28px;
      }
      @media screen and (max-width: 600px) {
        font-size: 26px;
      }
      @media screen and (max-width: 400px) {
        font-size: 24px;
      }
    }
    &__info-button {
      margin: 8px 0 0 16px;
      background: transparent;
      border: none;
      transition: .3s all;
      outline: transparent;
      cursor: pointer;
      @media screen and (max-width: 900px) {
        margin: 8px 0 0 8px;
      }
    }
    &__info-icon {
      width: 36px;
      height: 36px;
      @media screen and (max-width: 900px) {
        width: 24px;
        height: 24px;
      }
      @media screen and (max-width: 600px) {
        width: 22px;
        height: 22px;
      }
      @media screen and (max-width: 400px) {
        width: 20px;
        height: 20px;
      }
    }
    &__property {
      margin: 8px 0 0 16px;
      display: flex;
      @media screen and (max-width: 900px) {
        margin: 8px 0 0 8px;
        display: flex;
      }
      @media screen and (max-width: 600px) {
        margin: 8px 0 0 0;
      }
      @media screen and (max-width: 400px) {
        font-size: 24px;
      }

      .dropdown-selected {
        @media screen and (max-width: 900px) {
          font-size: 18px;
          margin: 4px 0 0 8px;
        }
      }
      .drop-down-button__text {
        @media screen and (max-width: 900px) {
          font-size: 16px;
        }
        @media screen and (max-width: 400px) {
          font-size: 12px;
        }
      }
    }
    &__property-text {
      margin: 0;
      font-size: 24px;
      color: white;
      font-weight: 300;
      @media screen and (max-width: 900px) {
        font-size: 16px;
      }
      @media screen and (max-width: 400px) {
        font-size: 12px;
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
      @media screen and (max-width: 900px) {
        font-size: 18px;
        margin-right: 16px;
      }
      @media screen and (max-width: 600px) {
        font-size: 16px;
        margin: 0 0 8px 0;
        align-self: flex-end;
      }
      @media screen and (max-width: 400px) {
        font-size: 12px;
        /*margin-right: 0;*/
      }
    }
    &__add-button {
      color: black;
      font-size: 24px;
      font-weight: bold;
      padding: 8px 36px;
      background: white;
      border: white;
      outline: transparent;
      cursor: pointer;
      @media screen and (max-width: 900px) {
        font-size: 14px;
        padding: 8px 16px;
      }
      @media screen and (max-width: 400px) {
        font-size: 12px;
        padding: 8px 16px;
      }
    }
  }
</style>