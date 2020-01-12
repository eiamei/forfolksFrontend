<template>
  <section class="item">
    <section v-show="isInfo" class="item-info-popup">
      <item-info class="item-info-popup__list" :desc="item.desc" :params="item.params"/>
    </section>
    <img v-for="image in images" :src="image.img" :key="image.color" :ref="image.color" width="100%">
    <section class="bottom-menu">
      <div class="bottom-menu__container">
        <section style="display: flex">
          <h2 class="bottom-menu__model">{{item.name}} {{item.model}}</h2>
          <app-button class="bottom-menu__info-button" @click="toggleInfo">
            <img src="../../../assets/svg/info.svg" class="bottom-menu__info-icon">
          </app-button>
        </section>
        <template v-if="item.properties">
          <section v-for="prop in properties" :key="prop.name + prop.selected" class="bottom-menu__color">
            <p class="bottom-menu__color-text">{{$t(`common.${prop.name}`)}}:</p>
            <dropdown2 :options="prop.value" v-model="prop.selected" :translate-namespace="prop.name"/>
          </section>
        </template>
        <section v-else class="bottom-menu__color">
          <p class="bottom-menu__color-text">{{$t('common.color')}}:</p>
          <dropdown class="bottom-menu__color-dropdown" :options="colors" :value="chosenColor.label" @change="selectColor"/>
        </section>
      </div>
      <div class="bottom-menu__container bottom-menu__buy">
        <p class="bottom-menu__price">{{item.price}}&thinsp;Р</p>
        <app-button class="bottom-menu__add-button" @click="addToBag">В корзину</app-button>
      </div>
    </section>
  </section>
</template>

<script>
  import AppButton from '../../../Core/Components/UI/AppButton';
  import Dropdown from '../../../Core/Components/UI/Dropdown';
  import STORE from '../../../Core/Constants/Store';
  import COLORS from '../../../Core/Constants/Colors';
  import ItemInfo from './item.info';
  import Dropdown2 from '../../../Core/Components/UI/Dropdown2';

  export default {
    name: 'ItemCard',
    components: {Dropdown2, ItemInfo, AppButton, Dropdown},
    data () {
      return {
        store: STORE,
        chosenColor: {
          label: this.$route.params.color || COLORS[this.item.colors][0].label
        },
        properties: [],
        isInfo: false
      };
    },
    computed: {
      item () {
        let model = this.$route.params.model;
        let type = this.$route.params.type;
        return this.store.find(function (item) {
          let fullName = `${item.name}${item.model ? '-' + item.model : ''}`.toLowerCase();
          return fullName === model && item.type === type;
        });
      },
      prop2 () {
        return this.$route.params.prop2;
      },
      fullName () {
        if (!this.item) return '';
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        return `${name}${model ? '-' + model : ''}`;
      },
      type () {
        if (!this.item) return '';
        return this.item.type.toLowerCase();
      },
      images () {
        let images = [];
        if (!this.item) return images;
        if (this.item.properties) {
          this.item.properties[0].value.forEach(prop1 => {
            if (this.item.properties[1]) {
              this.item.properties[1].value.forEach(prop2 => {
                images.push({
                  prop1,
                  prop2,
                  img: require(`@/assets/images/store/${this.type}-${this.fullName}-${prop1}-${prop2}.jpg`)
                })
              });
            } else {
              images.push({
                prop1,
                img: require(`@/assets/images/store/${this.type}-${this.fullName}-${prop1}.jpg`)
              })
            }
          });
        } else {
          images = this.item.availableColors.map(color => {
            return {
              color,
              img: require(`@/assets/images/store/${this.type}-${this.fullName}-${color}.jpg`)
            };
          });
        }
        return images;
      },
      colors () {
        return this.item && this.item.availableColors && this.item.availableColors.map((color, index) => {
          return {value: index, label: color}
        }) || [];
      }
    },
    beforeMount () {
      if (this.item && this.item.properties) {
        this.properties.push(...this.item.properties.map(prop => {
          return Object.assign({}, prop, { selected: 0 })
        }))
      }
    },
    methods: {
      addToBag () {
        if (!this.properties.length)
          this.$store.dispatch('bag/add', {
            name: this.item.name,
            model: this.item.model,
            price: this.item.price,
            type: this.item.type,
            color: this.chosenColor.label
          });
        else {
          console.log(this.properties[1].name, this.properties[1].value[this.properties[1].selected], this.properties[1].selected,  this.properties[1].value);
          this.$store.dispatch('bag/add', {
            name: this.item.name,
            model: this.item.model,
            price: this.item.price,
            type: this.item.type,
            [this.properties[0].name]: this.properties[0].value[this.properties[0].selected],
            [this.properties[1].name]: this.properties[1].value[this.properties[1].selected]
          });
        }
      },
      selectColor (value) {
        this.chosenColor = value;
        if (this.$refs[value.label]) {
          scrollTo(0, this.$refs[value.label][0].offsetTop + this.$refs[value.label][0].clientHeight / 4)
        }
      },
      toggleInfo () {
        this.isInfo = !this.isInfo;
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  .item-info-popup {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .8);
    color: white;
    transition: .6s all;
    &__list {
      width: calc(100% - 32px);
      height: calc(100vh - 180px);
      margin: 80px 16px 100px 16px;
      overflow: scroll;
    }
  }
  @media screen and (max-width: 900px) {
    .bottom-menu {
      &__model {
        font-size: 28px;
      }
      &__info-button {
        margin: 8px 0 0 8px;
      }
      &__info-icon {
        width: 24px;
        height: 24px;
      }
      &__color {
        margin: 8px 0 0 8px;
        display: flex;
      }
      &__color-text {
        font-size: 18px;
      }
      &__color-dropdown {
        .dropdown-selected {
          font-size: 18px;
          margin: 4px 0 0 8px;
          .dropdown__shevron {
            margin-top: 2px;
          }
        }
      }
      &__price {
        font-size: 18px;
        margin-right: 16px;
      }
      &__add-button {
        font-size: 18px;
        padding: 8px 16px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .bottom-menu {
      bottom: 16px;
      &__color {
        margin: 8px 0 0 0;
      }
      &__price {
        font-size: 18px;
        margin: 0 0 8px 0;
        align-self: flex-end;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .bottom-menu {
      &__model {
        font-size: 24px;
      }
      &__info-icon {
        width: 20px;
        height: 20px;
      }
      &__color-text {
        font-size: 16px;
      }
      &__color-dropdown {
        .dropdown-selected {
          font-size: 16px;
        }
      }
      &__price {
        font-size: 16px;
        margin-right: 0;
      }
      &__add-button {
        font-size: 12px;
        padding: 8px 16px;
      }
    }
  }
</style>