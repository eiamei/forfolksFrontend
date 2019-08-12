<template>
  <div class="item">
    <div class="item__first-row">
      <div class="item__top-bread">
        <router-link to="/store">{{$t(`links.store`)}}</router-link> / {{$t(`items.${item.type}s`)}}
      </div>
      <carousel :per-page="1" class="carousel" :navigate-to="navigateTo" @page-change="changeColorByCarousel">
        <slide v-for="image in images" class="item__image" :key="image.color">
          <img :src="image.img" class="image" :alt="alt">
        </slide>
      </carousel>
      <div class="item-info__container">
        <div class="item-info">
          <div class="item-info__bread">
            <router-link to="/store">{{$t(`links.store`)}}</router-link> / {{$t(`items.${item.type}s`)}}
          </div>
          <div class="item-info__name">{{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}</div>
          <div class="item-info__section">
            {{shortenDescription}}
            <span class="inner-link" v-scroll-to="'.item-description'">подробное описание</span>
          </div>
          <table class="item-info__spec">
            <tr v-if="item.model.length">
              <td>Модель:</td>
              <td>
                <app-button class="item-info__section-button button--item-selection" :content="item.model"/>
              </td>
            </tr>
            <tr>
              <td>Цвет:</td>
              <td>
                <dropdown :options="colors" :value="chosenColor.label" @change="selectColor"/>
              </td>
            </tr>
            <tr>
              <td>Цена:</td>
              <td>{{item.price}} ₽</td>
            </tr>
          </table>
          <div>
            <app-button content="Добавить в корзину" style="margin-top: 16px" class="button--add-to-cart" @click="addToBag"/>
          </div>
        </div>
      </div>
    </div>
    <hr/>
      <div class="section">Описание</div>
    <hr/>
    <div class="item-description">
      <div class="item-description__main-text" v-html="item.desc"></div>
      <table class="item-description__spec">
        <tr>
          <td>Размер:</td>
          <td>
            <span v-for="(param, key, index) in item.size" :key="`${param}.${key}`">{{$t(`size.${key}`)}}: {{param}} cм{{getSymbol(item.size, index)}} </span>
          </td>
        </tr>
        <tr>
          <td>Вес:</td>
          <td>{{item.weight}} гр</td>
        </tr>
        <tr>
          <td>Материал:</td>
          <td>
            <span v-for="(material, index) in item.material" :key="material">{{$t(`material.${material}`)}}{{getSymbol(item.material, index)}} </span>
          </td>
        </tr>
        <tr v-if="item.type !== 'hanging'">
          <td>Уход:</td>
          <td>Протирать влажной тряпочкой</td>
        </tr>
        <tr>
          <td>Цена:</td>
          <td>{{item.price}} ₽</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import AppButton from '../../../Core/Components/UI/AppButton';
  import Dropdown from '../../../Core/Components/UI/Dropdown';
  import STORE from '../../../Core/Constants/Store';
  import slugify from 'slugify';
  import COLORS from '../../../Core/Constants/Colors';
  import { Carousel, Slide } from 'vue-carousel';

  export default {
    name: 'ItemCard',
    components: {AppButton, Dropdown, Carousel, Slide},
    data () {
      return {
        store: STORE,
        chosenColor: '',
        item: null,
        size: '',
        material: '',
        price: '',
        symbolLimit: 30,
        navigateTo: 0
      };
    },
    created () {
      this.findItem();
    },
    mounted () {
      window.scrollTo(0, 0)
    },
    computed: {
      colors () {
        return this.item && this.item.availableColors && this.item.availableColors.map((color, index) => {
          return {value: index, label: color}
        }) || [];
      },
      images () {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        return this.item.availableColors.map(color => {
          return {
            color,
            img: require(`@/assets/images/store/${type}-${name}${model ? '-' + model : ''}-${color}.jpg`)
          };
        })
      },
      alt () {
        const name = this.item.name.toLowerCase();
        const model = this.item.model.toLowerCase();
        const type = this.item.type.toLowerCase();
        return `${this.$t(`items.${type}`)} ${name} ${model}`
      },
      shortenDescription () {
        if (this.item.desc.length > this.symbolLimit) {
          return this.item.desc.slice(0, this.symbolLimit) + '...';
        }
        return this.item.desc;
      }
    },
    methods: {
      findItem () {
        let params = this.$route.params.id.split('_');
        this.item = this.store.find(item => {
          console.log(item.type.toLowerCase() === params[0] && `${item.name.toLowerCase()}-${item.model.toLowerCase()}` === params[1]);
          if (item.type.toLowerCase() === params[0] && `${item.name.toLowerCase()}-${item.model.toLowerCase()}` === params[1])
            return true
          // let res = slugify(item.name.toLowerCase()) === params[1] &&
          //   slugify(item.type.toLowerCase()) === params[0];
          // if (res && item.model)
          //   res = slugify(item.model.toLowerCase()) === this.$route.query.model;
          // return res
          }
        );
      },
      selectColor (value) {
        this.chosenColor = value;
        let index = this.images.findIndex(image => {
          return image.color === value.label;
        });
        if (index > -1)
          this.navigateTo = index;
      },
      getSymbol (source, index) {
        return index < (Object.keys(source).length - 1) ? ', ' : ''
      },
      addToBag () {
        this.$store.dispatch('bag/add', {
          name: this.item.name,
          model: this.item.model,
          price: this.item.price,
          type: this.item.type,
          color: this.chosenColor.label
        });
      },
      changeColorByCarousel (page) {
        this.chosenColor = this.colors[page];
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';

  .item {
    min-height: 100vh;
    width: 100%;
    &__first-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 48px;
      padding: 24px 40px;
    }
    &__top-bread {
      display: none;
    }
    .section {
      font-size: 30px;
      font-weight: 300;
      margin-left: 40px;
    }
    .inner-link {
      color: $active-link;
      text-decoration: underline;
      cursor: pointer;
    }
    .carousel {
      width: 50%;
    }
    .item__image {
      width: 100%;
      height: 80vh;
      position: relative;
      //background-color: $dusty-rose;
      display: flex;
      justify-content: center;
      .image {
        position: relative;
        z-index: 10;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .image-not-found {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 11;
        background-color: rgba($dark-gray, 0.8);
        color: white;
        border-radius: 4px;
        font-size: 24px;
      }
      .item-image-background {
        border-radius: 4px;
        position: absolute;
        width: 100%;
        left: 24px;
        top: 24px;
        height: 100%;
        background-color: $dusty-rose;
        z-index: 1;
      }
    }
    .item-info {
      &__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        /*margin-left: 80px;*/
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      font-size: 14px;
      &__bread {
      }
      &__name {
        margin-top: 8px;
        font-size: 30px;
        font-weight: 700;
      }
      &__spec {
        margin: 16px 0;
        tr td {
          padding: 4px 0;
          vertical-align: top;
          &:first-child {
            padding-right: 16px;
            font-weight: 500;
          }
        }
      }
      &__section {
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      &__section-button {
        margin-right: 8px;
      }
    }
    .item-description {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin: 24px 40px;
      padding: 0;
      &__main-text {
        width: 50%;
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      &__spec {
        width: 50%;
        margin: 0 16px;
        tr td {
          padding: 4px 0;
          vertical-align: top;
          &:first-child {
            padding-right: 16px;
            font-weight: 500;
          }
        }
      }
    }
    @media screen and (max-width: 1400px){
      .item-info {
        &__name {
          font-size: 24px;
        }
      }
      .section {
        font-size: 24px;
      }
    }
    @media screen and (max-width: 1050px) {
      .item-info {
        font-size: 12px;
        &__name {
          margin-top: 8px;
          font-size: 24px;
        }
        &__section-button {
          font-size: 10px!important;
        }
      }

      .item-description {
        font-size: 12px;
        margin: 16px 40px;
      }
      .dropdown {
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
    }
    @media screen and (max-width: 900px) {
      .carousel {
        width: 100%;
      }
      .item-image {

        height: 60vh;
      }
      &__top-bread {
        display: inline;
        font-size: 12px;
        margin-bottom: 8px;
      }
      &__first-row {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 48px;
        padding: 8px 40px;
      }
      .item-info {
        &__container {
          width: 100%;
          align-items: flex-start;
        }
        &__container {
          margin-left: 0;
        }
        &__bread {
          display: none;
        }
      }

    }
    @media screen and (max-width: 770px) {
      .section {
        margin-left: 16px;
      }
      &__first-row {
        padding: 8px 16px;
      }
      .item-description {
        margin: 0 16px;
      }
    }
    @media screen and (max-width: 500px) {

      .item__image {
        .image {
          object-fit: cover;
        }
      }
      .section {
        font-size: 20px;
        margin-left: 8px;
      }
      &__first-row {
        padding: 8px;
      }
      .item-info {
        font-size: 10px;
        &__name {
          font-size: 20px;
        }
      }
      .item-description {
        flex-direction: column;
        margin: 8px;
        &__main-text {
          width: 100%;
        }
        &__spec {
          width: 100%;
          margin: 16px 0;
        }
      }
    }
  }
</style>