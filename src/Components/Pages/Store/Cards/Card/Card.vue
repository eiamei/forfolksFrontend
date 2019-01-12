<template>
  <router-link :to="`/item?name=${itemSlug}`" class="store-card">
    <img class="image" :src="itemImage" :width="`${isBig ? '700' : '350'}px`">
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
      },
      isBig: {
        type: Boolean
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
    position: relative;
    &:hover {
      .store-card__data {
        visibility: visible;
      }
    }
    &__data {
      visibility: hidden;
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 350px;
      height: 350px;
      background-color: rgba(black, .7);
      color: white
    }
    &__name {
      font-weight: 700;
    }
  }
</style>