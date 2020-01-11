<template>
  <section class="item-info">
    <p class="item-info-description" v-html="desc"></p>
    <ul class="item-info-params">
      <li v-for="(param, key) in params" class="item-info-params__item-container item-info-params__item-container--main" :key="key">
        <div v-if="key === 'size'" class="item-info-params__item-container">
          <p class="item-info-params__item">{{$t(`common.${key}`)}}:</p>
          <p v-for="(prop, key) in param" class="item-info-params__item" :key="key">{{$t(`size.${key}`)}} {{prop}}</p>
        </div>
        <div v-else-if="key === 'material'" class="item-info-params__item-container">
          <p class="item-info-params__item">{{$t(`common.${key}`)}}:</p>
          <p v-for="prop in param" class="item-info-params__item" :key="prop">{{$t(`material.${prop}`)}}</p>
        </div>
        <template v-else>
          {{$t(`common.${key}`)}}: {{param}}
        </template>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'itemCardInfo',
    props: {
      desc: {
        type: String,
        required: true
      },
      params: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style lang="scss">
  .item-info {
    padding: 32px 16px;
    &-description {
      margin: 0 0 32px 0;
    }
    &-params {
      padding: 0;
      &__item-container {
        list-style: none;
        display: flex;
        &--main {
          margin: 12px 0 12px 0;
        }
      }
      &__item {
        margin: 0;
        padding: 0 8px 0 0;
      }
    }
  }
</style>