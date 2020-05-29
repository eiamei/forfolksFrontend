<template>
  <div class="item-card">
    <section ref="images" v-if="images">
      <img v-for="(image, index) in images" :src="image" :key="index" class="item-card__image" width="100%">
    </section>
    <item-card-menu v-if="item" :item="item" :storeItems="storeItems"/>
    <item-card-info v-if="item" :desc="item.desc" :params="item.itemProperty"/>
  </div>
</template>

<script>
import slugify from 'slugify';
import ItemCardMenu from './itemCard.menu';
import ItemCardInfo from './itemCard.info';

export default {
  name: 'itemCard',
  components: {ItemCardInfo, ItemCardMenu},
  computed: {
    storeItems () {
      return this.$store.state.store.items;
    },
    item () {
      if (this.storeItems.length) {
        let params = {
          root: '',
          properties: []
        };
        Object.keys(this.$route.params).forEach(param => {
          if (param === 'root')
            params.root = this.$route.params[param];
          else if (this.$route.params[param])
            params.properties.push(this.$route.params[param])
        });
        try {
          let item = this.storeItems.find(function (item) {
            if (item.rootPath === params.root && item.selectableProperty.length === params.properties.length) {
              for (let i = 0, len = params.properties.length; i < len; i++) {
                if (!item.selectableProperty.find(property => slugify(property.value.toLowerCase()) === slugify(params.properties[i].toLowerCase()))) return false;
              }
              return item;
            }
            return false
          });
          if (item)
            return item;
        } catch (e) {
          console.log(e);
        }
      }
      return {}
    },
    images () {
      if (this.item) {
        let path = this.item.rootPath;
        if (this.item.selectableProperty.length)
          this.item.selectableProperty.forEach(property => {
            path += `-${slugify(property.value.toLowerCase())}`
          });
        let images = [];
        for (let i = 0, len = 10; i < len; i++) {
          try {
            images.push(require(`@/assets/images/store/${path}${i > 0 ? '(' + i + ')' : ''}.jpg`))
          } catch (e) {
            break;
          }
        }
        return images;
      }
      return [];
    },
  }
};
</script>

<style lang="scss">
  body {
    overflow: scroll;
  }
  .item-card {
    position: relative;
    overflow-y: scroll;
    &__image {
      position: relative;
      z-index: 5;
    }
  }
</style>