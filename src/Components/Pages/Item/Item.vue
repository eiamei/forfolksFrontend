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
        <section class="bottom-menu__color">
          <p class="bottom-menu__color-text">{{$t('common.color')}}:</p>
          <dropdown class="bottom-menu__color-dropdown" :options="colors" :value="chosenColor.label" @change="selectColor"/>
        </section>
      </div>
      <div class="bottom-menu__container bottom-menu__buy">
        <p class="bottom-menu__price">{{item.price}}₽</p>
        <app-button class="bottom-menu__add-button" @click="addToBag">В корзину</app-button>
      </div>
    </section>
  </section>
  <!--<div class="item">-->
  <!--<div class="item__first-row">-->
  <!--<div class="item__top-bread">-->
  <!--<router-link to="/store">{{$t(`links.store`)}}</router-link> / {{$t(`items.${item.type}s`)}}-->
  <!--</div>-->
  <!--<carousel :per-page="1" class="carousel" :navigate-to="navigateTo" @page-change="changeColorByCarousel">-->
  <!--<slide v-for="image in images" class="item__image" :key="image.color">-->
  <!--<img :src="image.img" class="image" :alt="alt">-->
  <!--</slide>-->
  <!--</carousel>-->
  <!--<div class="item-info__container">-->
  <!--<div class="item-info">-->
  <!--<div class="item-info__bread">-->
  <!--<router-link to="/store">{{$t(`links.store`)}}</router-link> / {{$t(`items.${item.type}s`)}}-->
  <!--</div>-->
  <!--<div class="item-info__name">{{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}</div>-->
  <!--<div class="item-info__section">-->
  <!--{{shortenDescription}}-->
  <!--<span class="inner-link" v-scroll-to="'.item-description'">подробное описание</span>-->
  <!--</div>-->
  <!--<table class="item-info__spec">-->
  <!--<tr v-if="item.model.length">-->
  <!--<td>Модель:</td>-->
  <!--<td>-->
  <!--<app-button class="item-info__section-button button&#45;&#45;item-selection" :content="item.model"/>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>Цвет:</td>-->
  <!--<td>-->
  <!--<dropdown :options="colors" :value="chosenColor.label" @change="selectColor"/>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>Цена:</td>-->
  <!--<td>{{item.price}} ₽</td>-->
  <!--</tr>-->
  <!--</table>-->
  <!--<div>-->
  <!--<app-button content="Добавить в корзину" style="margin-top: 16px" class="button&#45;&#45;add-to-cart" @click="addToBag"/>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<hr/>-->
  <!--<div class="section">Описание</div>-->
  <!--<hr/>-->
  <!--<div class="item-description">-->
  <!--<div class="item-description__main-text" v-html="item.desc"></div>-->
  <!--<table class="item-description__spec">-->
  <!--<tr>-->
  <!--<td>Размер:</td>-->
  <!--<td>-->
  <!--<span v-for="(param, key, index) in item.size" :key="`${param}.${key}`">{{$t(`size.${key}`)}}: {{param}} cм{{getSymbol(item.size, index)}} </span>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>Вес:</td>-->
  <!--<td>{{item.weight}} гр</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>Материал:</td>-->
  <!--<td>-->
  <!--<span v-for="(material, index) in item.material" :key="material">{{$t(`material.${material}`)}}{{getSymbol(item.material, index)}} </span>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr v-if="item.type !== 'hanging'">-->
  <!--<td>Уход:</td>-->
  <!--<td>Протирать влажной тряпочкой</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>Цена:</td>-->
  <!--<td>{{item.price}} ₽</td>-->
  <!--</tr>-->
  <!--</table>-->
  <!--</div>-->
  <!--</div>-->
</template>

<script>
  import AppButton from '../../../Core/Components/UI/AppButton';
  import Dropdown from '../../../Core/Components/UI/Dropdown';
  import STORE from '../../../Core/Constants/Store';
  import COLORS from '../../../Core/Constants/Colors';
  import ItemInfo from './item.info';

  export default {
    name: 'ItemCard',
    components: {ItemInfo, AppButton, Dropdown},
    // components: {AppButton, Dropdown, Carousel, Slide},
    data () {
      return {
        store: STORE,
        chosenColor: {
          label: this.$route.params.color || COLORS[this.item.colors][0].label
        },
        isInfo: false
        // item: null,
        // name: this.$route.query.name || '',
        // type: this.$route.query.type || '',
        // size: '',
        // material: '',
        // price: '',
        // symbolLimit: 30,
        // navigateTo: 0
      };
    },
    created () {
      // this.findItem();
    },
    mounted () {
      // window.scrollTo(0, 0)
    },
    computed: {
      item () {
        let model = this.$route.params.model;
        let type = this.$route.params.type;
        return this.store.find(function (item) {
          let fullName = `${item.name}${item.model ? '-' + item.model : ''}`.toLowerCase();
          console.log(fullName, model, item.type, type)
          return fullName === model && item.type === type;
        });
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
        if (!this.item) return [];
        return this.item.availableColors.map(color => {
          return {
            color,
            img: require(`@/assets/images/store/${this.type}-${this.fullName}-${color}.jpg`)
          };
        });
      },
      colors () {
        return this.item && this.item.availableColors && this.item.availableColors.map((color, index) => {
          return {value: index, label: color}
        }) || [];
      }
      // images () {
      //   const name = this.item.name.toLowerCase();
      //   const model = this.item.model.toLowerCase();
      //   const type = this.item.type.toLowerCase();
      //   return this.item.availableColors.map(color => {
      //     return {
      //       color,
      //       img: require(`@/assets/images/store/${type}-${name}${model ? '-' + model : ''}-${color}.jpg`)
      //     };
      //   })
      // },
      // alt () {
      //   const name = this.item.name.toLowerCase();
      //   const model = this.item.model.toLowerCase();
      //   const type = this.item.type.toLowerCase();
      //   return `${this.$t(`items.${type}`)} ${name} ${model}`
      // },
      // shortenDescription () {
      //   if (this.item.desc.length > this.symbolLimit) {
      //     return this.item.desc.slice(0, this.symbolLimit) + '...';
      //   }
      //   return this.item.desc;
      // }
    },
    methods: {
      addToBag () {
        this.$store.dispatch('bag/add', {
          name: this.item.name,
          model: this.item.model,
          price: this.item.price,
          type: this.item.type,
          color: this.chosenColor.label
        });
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
      // findItem () {
      //   this.item = this.store.find(item => {
      //     let res = slugify(item.name.toLowerCase()) === this.$route.query.name &&
      //       slugify(item.type.toLowerCase()) === this.$route.query.type;
      //     if (res && item.model)
      //       res = slugify(item.model.toLowerCase()) === this.$route.query.model;
      //     return res
      //     }
      //   );
      // },
      // selectColor (value) {
      //   this.chosenColor = value;
      //   let index = this.images.findIndex(image => {
      //     return image.color === value.label;
      //   });
      //   if (index > -1)
      //     this.navigateTo = index;
      // },
      // getSymbol (source, index) {
      //   return index < (Object.keys(source).length - 1) ? ', ' : ''
      // },
      // changeColorByCarousel (page) {
      //   this.chosenColor = this.colors[page];
      // }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';
  .item {
    position: relative;
    background-color: rgba(0, 0, 0, .8);
  }
  .bottom-menu {
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
      &__container {
        flex-direction: column;
        align-items: start;
      }
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
        font-size: 16xpx;
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