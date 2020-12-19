<template>
  <main>
    <nav class="catalogue">
      <ul class="catalogue-list">
        <li v-for="link in byCategory" :key="link.to">
          <router-link class="catalogue-list__link" :to="link.to" replace>{{$t(link.text)}}</router-link>
        </li>
      </ul>
      <ul class="catalogue-list">
        <li v-for="link in byRoom" :key="link.to">
          <router-link class="catalogue-list__link" :to="link.to" replace>{{$t(link.text)}}</router-link>
        </li>
      </ul>
      <ul class="catalogue-list">
        <li v-for="link in links" :key="link.to">
          <router-link class="catalogue-list__link" :to="link.to">{{$t(link.text)}}</router-link>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';

  interface Data {}

  export default Vue.extend<Data, any, any, any>({
    components: {},
    data () : Data {
      return {
        byCategory: [{
          to: '/store/category/newYear',
          text: 'Новый год'
        },{
          to: '/store/category/accessories',
          text: 'Аксессуары'
        }, {
          to: '/store/category/cachepot',
          text: 'Кашпо'
        }, {
          to: '/store/category/pot',
          text: 'Горшки'
        }, {
          to: '/store/category/dish',
          text: 'Посуда'
        }, {
          to: '/store/category/basket',
          text: 'Корзины'
        }, {
          to: '/store/category/linen',
          text: 'Полотенца'
        }, {
          to: '/store/category/board',
          text: 'Разделочные доски'
        }, {
          to: '/store/category/candle',
          text: 'Свечи'
        }, {
          to: '/store/category/pictures',
          text: 'Картины'
        }, {
          to: '/store/category/book',
          text: 'Книги'
        }, {
          to: '/store/category/postcard',
          text: 'Открытки'
        }, {
          to: '/store/category/diffuser',
          text: 'Диффузоры'
        }, {
          to: '/store/category/soap',
          text: 'Мыло'
        }, {
          to: '/store/category/cosmetic',
          text: 'Косметика'
        }, {
          to: '/store/category/vase',
          text: 'Вазы'
        }, {
          to: '/store/category/plate',
          text: 'Подставки'
        }, {
          to: '/store/category/bedsheet',
          text: 'Постельное белье'
        }, {
          to: '/store/category/bag',
          text: 'Сумки'
        }, {
          to: '/store/category/kitchentextile',
          text: 'Кухонный текстиль'
        }, {
          to: '/store/category/toy',
          text: 'Игрушки'
        }, {
          to: '/store/category/macrame',
          text: 'Макраме'
        }, {
          to: '/store/category/driedflower',
          text: 'Сухоцветы'
        }],
        byRoom: [{
          to: '/store/room/kitchen',
          text: 'Кухня'
        }, {
          to: '/store/room/dinning',
          text: 'Столовая'
        }, {
          to: '/store/room/guest',
          text: 'Гостиная'
        }, {
          to: '/store/room/bed',
          text: 'Спальня'
        }, {
          to: '/store/room/bath',
          text: 'Ванная'
        }, {
          to: '/store/room/child',
          text: 'Дети'
        }, {
          to: '/store/room/aroma',
          text: 'Ароматы'
        }, {
          to: '/store/room/outside',
          text: 'Вне дома'
        }],
        links: [{
          to: '/store/category/all',
          text: 'Весь каталог'
        }, {
          to: '/delivery',
          text: 'Доставка и оплата'
        }, {
          to: '/about',
          text: 'О нас'
        }]
      };
    }
  })
</script>

<style>
  .catalogue {
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
  }
  .catalogue-list {
    list-style: none;
    padding: 0;
    margin-right: 4rem;
  }
  .catalogue-list__link {
    color: black;
    text-decoration: none;
    transition: color 2s;
  }
  .catalogue-list__link:hover,.catalogue-list__link:active {
    color: var(--dark-blue);
  }
  .catalogue-list__link:focus {
    text-decoration: underline;
  }
</style>