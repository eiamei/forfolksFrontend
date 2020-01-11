<template>
  <section class="bag-item-container">
    <img class="bag-item-image" :src="itemImage"/>
    <div class="bag-item">
      <h3>{{item.name}}</h3>
      <section class="bag-item__row">
        <p style="width: 50%; margin: 0"> <template v-for="(prop, index) in item.props">{{index > 0 ? ', ' : ''}}{{$t(`common.${prop.name}`)}}: {{$t(`${prop.name}s.${prop.value}`)}}</template> </p>
        <section style="display: flex; justify-content: center; align-items: center">
          <p class="bag-item__field">{{item.price}}</p>
          <button class="bag-item__button" @click="increment">+</button>
          <p class="bag-item__field">{{item.qty}}</p>
          <button class="bag-item__button" @click="decrement">-</button>
          <p class="bag-item__field">{{item.price * item.qty}}</p>
        </section>
        <button class="bag-item__button" @click="remove">Удалить</button>
      </section>
    </div>
  </section>
</template>

<script>
import slugify from 'slugify';

export default {
  name: 'bagItem',
  props: {
    item: {
      required: true
    }
  },
  computed: {
    itemImage () {
      if (this.id)
        return require(`@/assets/images/store/${this.id}-small.jpg`);
      return '';
    },
    id () {
      let id = `${this.item.type}-${slugify(this.item.name.toLowerCase())}`;
      if (this.item.props.length)
        this.item.props.forEach(property => {
          id += `-${slugify(property.value.toLowerCase())}`
        });
      return id;
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
  .bag-item-container {
    display: flex;
    text-align: left;
    max-width: 1200px;
    width: 100%;
    border-bottom: 1px solid black;
    margin: 0 0 8px 0;
    padding: 0 0 8px 0;
  }
  .bag-item-image {
    height: 180px;
    width: 180px;
    object-fit: cover;
    object-position: 50% 100%;
  }
  .bag-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 0 0 16px;
    &__row {
      display: flex;
      justify-content: space-between;
    }
    &__field {
      padding: 0 16px;
      margin: 0;
      cursor: default;
    }
    &__button {
      color: black;
      font-size: 16px;
      border: 1px solid black;
      padding: 1px 8px 4px 8px;
      cursor: pointer;
    }
  }
</style>