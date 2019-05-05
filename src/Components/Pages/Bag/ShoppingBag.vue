<template>
  <div class="bag-item-container">
    <div class="bag-item">
      <img :src="itemImage" class="bag-item__image">
      <table class="bag-item__table">
        <tr class="bag-item__table-header">
          <td>Название</td>
          <td class="bag-item__table-color-cell">Цвет</td>
          <td class="bag-item__table-qty-cell">Количество</td>
          <td class="bag-item__table-price-cell">Стоимость</td>
        </tr>
        <tr>
          <td>
            {{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}
            <span class="bag-item__table-color-in-name">{{$t(`colors.${item.color}`)}}</span>
          </td>
          <td class="bag-item__table-color">{{$t(`colors.${item.color}`)}}</td>
          <td class="bag-item__table-qty">
            <app-button class="button--increment-decrement" @click="decrement">
              <div slot="content">-</div>
            </app-button>
            <div class="qty-cell">
              {{item.qty}}
            </div>
            <app-button class="button--increment-decrement" @click="increment">
              <div slot="content">+</div>
            </app-button>
            <app-button class="button--bag-item-remove" @click="remove">
              <div slot="content">x</div>
            </app-button>
          </td>
          <td class="bag-item__table-price">{{+item.price * +item.qty}} ₽</td>
        </tr>
      </table>
    </div>
    <table class="bag-item__table bag-item__table--mobile">
      <tr class="bag-item__table-header bag-item__table-header--mobile">
        <td>Количество</td>
        <td>Стоимость</td>
      </tr>
      <tr>
        <td class="bag-item__table-qty bag-item__table-qty--mobile">
          <app-button class="button--increment-decrement" @click="decrement">
            <div slot="content">-</div>
          </app-button>
          <div class="qty-cell">
            {{item.qty}}
          </div>
          <app-button class="button--increment-decrement" @click="increment">
            <div slot="content">+</div>
          </app-button>
          <app-button class="button--bag-item-remove" @click="remove">
            <div slot="content">x</div>
          </app-button>
        </td>
        <td>{{+item.price * +item.qty}} ₽</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import AppButton from '../../../Core/Components/UI/AppButton';
  export default {
    name: 'bag-item',
    components: {AppButton},
    props: {
      item: {
        required: true
      }
    },
    computed: {
      itemImage () {
        if (this.item) {
          const name = this.item.name.toLowerCase();
          const model = this.item.model.toLowerCase();
          const type = this.item.type.toLowerCase();
          // const color = this.showHider ? COLORS[this.item.colors][0].label : this.chosenColor.label;
          // return require(`@/assets/images/store/${type}-${name}${model ? '-' + model : ''}-coated.jpg`);
          return require(`@/assets/images/storeIcons/${type}-${name}${model ? '-' + model : ''}.jpg`);
        }
        return '';
      },
      id () {
        return `${this.item.type}${this.item.name}${this.item.model}${this.item.color}`
      }
    },
    methods: {
      decrement () {
        this.$store.dispatch('bag/decrement', this.id);
      },
      increment () {
        this.$store.dispatch('bag/increment', this.id);
      },
      remove () {
        this.$store.dispatch('bag/remove', this.id);
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/colors';
 .bag-item-container {
   border-top: 1px solid $light-gray;
   border-bottom: 1px solid $light-gray;
   width: 100%;
   margin-bottom: 16px;
   .bag-item {
     width: 100%;
     display: flex;
     &__image {
       height: 100px
     }
     &__table {
       width: calc(100% - 124px);
       margin-top: 16px;
       margin-left: 24px;
       td {
         &:first-child {
           width: 35%;
         }
         &:last-child {
           width: 15%;
           text-align: right;
         }
         width: 25%;
       }
       &--mobile {
         margin: 16px 0 8px 0;
         display: none;
         @media screen and (max-width: 700px) {
           width: 100%;
           display: table;
         }
       }
     }
     &__table-color-in-name {
       display: none;
       @media screen and (max-width: 450px) {
         color: $dark-gray;
         display: block;
       }
     }
     &__table-header {
       td {
         font-weight: 700;
         color: $dark-gray;
       }
       &--mobile {
         td {
           &:first-child {
             text-align: left;
           }
         }
       }
     }
     &__table-qty {
       display: flex;
       align-items: center;
       @media screen and (max-width: 700px) {
         display: none;
       }
       .qty-cell {
         font-size: 16px;
         margin-right: 8px;
       }
       &--mobile {
         display: flex;
       }
     }
     &__table-color-cell {
       @media screen and (max-width: 700px) {
         text-align: right;
       }
       @media screen and (max-width: 450px) {
         display: none;
       }
     }
     &__table-color {
       @media screen and (max-width: 700px) {
         text-align: right;
       }
       @media screen and (max-width: 450px) {
         display: none;
       }
     }
     &__table-qty-cell, &__table-price-cell, &__table-price {
       /*display: table-cell;*/
       @media screen and (max-width: 700px) {
         display: none;
       }
     }
   }
 }
</style>