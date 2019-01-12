<template>
  <div class="item">
    <div class="item__first-row">
      <div class="item__base-info">
        <div>{{$t(`items.${type}`)}} {{name}}</div>
      </div>
      <img :src="itemImage">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemCard',
    data () {
      return {
        name: this.$route.query.name || '',
        type: this.$route.query.type || ''
      };
    },
    computed: {
      itemImage () {
        if (this.$route.query.name) {
          return require(`@/assets/images/storeIcons/${this.$route.query.name}.jpg`);
        }
        return '';
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../assets/styles/_colors';

  .item {
    &__first-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between
    }
    &__base-info {
      background-color: $blue-gray;
      width: 100%;
    }
  }
</style>