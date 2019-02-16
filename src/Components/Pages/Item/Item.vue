<template>
  <div class="item">
    <div class="item__first-row">
      <div class="item__image">
        <img :src="itemImage" class="image">
        <div class="item-image-background">s</div>
        <div>
          <img :src="itemImage" class="image-preview">
          <img :src="itemImage" class="image-preview">
          <img :src="itemImage" class="image-preview">
          <img :src="itemImage" class="image-preview">
          <img :src="itemImage" class="image-preview">
        </div>
      </div>
      <div  class="item-info__container">
        <div class="item-info">
          <div class="item-info__bread">
            <router-link to="/store">{{$t(`links.store`)}}</router-link> / {{$t(`items.${item.type}s`)}}</div>
          <div class="item-info__name">{{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}</div>
          <div class="item-info__section">
            Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Таким образом реализация намеченных плановых заданий влечет за собой процесс внедрения и
          </div>
          <table class="item-info__spec">
            <tr v-if="item.model.length">
              <td>Модель:</td>
              <td>
                <app-button class="item-info__section-button button--item-selection" :content="item.model"/>
                <!--<app-button class="item-info__section-button button&#45;&#45;item-selection" content="S"/>-->
                <!--<app-button class="item-info__section-button button&#45;&#45;item-selection" content="M"/>-->
              </td>
            </tr>
            <tr>
              <td>Цвет:</td>
              <td>
                <dropdown :options="colors[item.colors]" :value="chosenColor.label" @change="value => this.chosenColor = value"/>
              </td>
            </tr>
            <tr>
              <td>Размер:</td>
              <td>
                <span v-for="(param, key) in item.size">{{$t(`size.${key}`)}}: {{param}} cм </span>
              </td>
            </tr>
            <tr>
              <td>Вес:</td>
              <td>{{item.weight}} гр</td>
            </tr>
            <tr>
              <td>Материал:</td>
              <td>
                <span v-for="material in item.material">{{$t(`material.${material}`)}} </span>
              </td>
            </tr>
            <tr>
              <td>Цена:</td>
              <td>{{item.price}} ₽</td>
            </tr>
          </table>
          <div>
            <app-button content="Добавить в корзину" style="margin-top: 16px" class="button--add-to-cart button--add-to-cart-disabled"/>
            <span style="padding-left: 16px">Скоро будет доступно :)</span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 24px 0 12px 0 ; font-size: 24px; text-align: center; font-weight: 300">Вдохновение</div>
    <img :src="itemImage" class="insipration-image">
    <img :src="itemImage" class="insipration-image">
    <img :src="itemImage" class="insipration-image">
  </div>
</template>

<script>
  import AppButton from '../../Reusable/UI/AppButton';
  import Dropdown from '../../Reusable/UI/Dropdown';
  import Store from '../../../Core/Constants/Store';
  import Colors from '../../../Core/Constants/Colors';
  import slugify from 'slugify';
  export default {
    name: 'ItemCard',
    components: {AppButton, Dropdown},
    data () {
      return {
        store: Store,
        colors: Colors,
        chosenColor: '',
        item: null,
        name: this.$route.query.name || '',
        type: this.$route.query.type || '',
        size: '',
        material: '',
        price: ''
      };
    },
    created () {
      this.findItem();
    },
    computed: {
      itemImage () {
        if (this.item) {
          const name = this.item.name.toLowerCase();
          const model = this.item.model.toLowerCase();
          const type = this.item.type.toLowerCase();
          return require(`@/assets/images/store/${type}-${name}${model ? '-' + model : ''}.jpg`);
        }
        return '';
      }
    },
    methods: {
      findItem () {
        this.item = this.store.find(item => slugify(item.name.toLowerCase()) === this.$route.query.name);
        this.chosenColor = this.colors[this.item.colors][0];
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
      padding: 24px;
    }
    .item__image {
      width: 50%;
      position: relative;
      .image {
        position: relative;
        width: 100%;
        z-index: 10;
      }
      .item-image-background {
        position: absolute;
        width: 100%;
        left: 24px;
        top: 24px;
        height: calc(100% - 8px);
        background-color: $dusty-rose;
        z-index: 1;
      }
      .image-preview {
        width: 80px;
        height: 80px;
        margin-right: 16px;
        z-index: 10;
        position: relative;
      }
    }
    .item-info {
      &__container {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      font-size: 14px;
      &__bread {
      }
      &__name {
        margin-top: 16px;
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
    .insipration-image {
      margin: 12px 24px;
      width: calc(100% - 48px);
    }
  }
  /*@media screen and (max-width: 1050px) {*/
    /*.item {*/
      /*&__first-row {*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*padding: 88px 24px;*/
      /*}*/
      /*.item__image {*/
        /*width: 100%;*/
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: flex-start;*/
      /*}*/
      /*.image {*/
        /*height: 50vw;*/
        /*&--preview {*/
          /*height: 40px;*/
          /*margin: 8px;*/
        /*}*/
      /*}*/
      /*.item-info {*/
        /*width: 100%;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*margin-top: 16px;*/
      /*}*/
    /*}*/
  /*}*/
  /*@media screen and (max-width: 600px) {*/
    /*.item {*/
      /*&__first-row {*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*padding: 80px 16px;*/
      /*}*/
      /*.item__image {*/
        /*width: 100%;*/
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: center;*/
      /*}*/
      /*.image {*/
        /*height: 50vw;*/
        /*padding: 0;*/
        /*&--preview {*/
          /*display: none;*/
          /*height: 20px;*/
          /*margin: 8px;*/
        /*}*/
      /*}*/
      /*.item-info {*/
        /*width: 100%;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*margin-top: 16px;*/
        /*&__bread {*/
          /*font-size: 10px;*/
        /*}*/
        /*&__name {*/
          /*font-size: 24px;*/
          /*font-weight: 700;*/
        /*}*/
        /*&__spec {*/
          /*margin: 16px 0;*/
          /*font-size: 12px;*/
          /*tr td {*/
            /*padding: 8px 0;*/
            /*vertical-align: top;*/
            /*&:first-child {*/
              /*padding-right: 16px;*/
              /*font-weight: 500;*/
            /*}*/
          /*}*/
        /*}*/
        /*&__section {*/
          /*font-size: 12px;*/
        /*}*/
        /*&__section-button {*/
          /*margin: 0 4px 4px 4px;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/

  /*.devider {*/
    /*margin: 8px 0;*/
    /*width: 100%;*/
    /*height: 1px;*/
    /*//border-bottom: 1px solid $dark-gray*/
  /*}*/
</style>