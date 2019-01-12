<template>
  <router-link :to="`/item?name=${itemSlug}`" class="store-card">
    <img :src="itemImage" width="470px">
    <div class="store-card__data">
      <div class="store-card__name">{{$t(`items.${type}`)}} {{name}}</div>
      <div class="store-card__price">{{price}}</div>
    </div>
  </router-link>
</template>

<script>
  import slugify from 'slugify';
  export default {
    name: 'StoreCard',
    props: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: false
      },
      price: {
        type: Number,
        required: true
      }
    },
    computed: {
      itemSlug () {
        return slugify(this.name).toLowerCase();
      },
      itemImage () {
        return require(`@/assets/images/storeIcons/${this.itemSlug}.jpg`);
      }
    }
  };
</script>

<style lang='scss'>
  .store-card {
    text-decoration: none;
    color: black;
    cursor: pointer;
    &__data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &__name {
      font-weight: 700;
    }
  }
</style>