<template>
  <div class="bag-item-container">
    <div class="bag-item">
      <img :src="itemImage" class="bag-item__image">
      <table class="bag-item__table">
        <tr class="bag-item__table-header">
          <td>Название</td>
          <td>Цвет</td>
          <td>Количество</td>
          <td>Стоимость</td>
        </tr>
        <tr>
          <td>{{$t(`items.${item.type}`)}} {{item.name}} {{item.model}}</td>
          <td>{{$t(`colors.${item.color}`)}}</td>
          <td class="bag-item__table-qty">
            <app-button content="-" @click="decrement"/>
            <div>
              {{item.qty}}
            </div>
            <app-button content="+" @click="increment"/>
            <app-button content="x" @click="remove"/>
          </td>
          <td>{{+item.price * +item.qty}}</td>
        </tr>
      </table>
    </div>
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
   margin-top: 24px;
   border-top: 1px solid $light-gray;
   border-bottom: 1px solid $light-gray;
   .bag-item {
     display: flex;
     &__image {
       height: 100px
     }
     &__table {
       width: 100%;
       margin-top: 16px;
       margin-left: 24px;
     }
     &__table-header {
       td {
         font-weight: 700;
         color: $dark-gray;
       }
     }
     &__table-qty {
       display: flex;
     }
   }
 }
</style>