<template>
  <main>
    <nav class="catalogue">
      <ul class="catalogue-list">
        <li v-for="link in byCategory" :key="link.to">
          <router-link :class="getLinkClass(link)" :to="link.to" replace>{{$t(link.text)}}</router-link>
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
        categories: {
          sale: {
            to: '/store/category/sale',
            text: 'Sale'
          },
          accessories: {
            to: '/store/category/accessories',
            text: 'Аксессуары'
          },
          vase: {
            to: '/store/category/vase',
            text: 'Вазы'
          },
          pot: {
            to: '/store/category/pot',
            text: 'Горшки'
          },
          diffuser: {
            to: '/store/category/diffuser',
            text: 'Диффузоры'
          },
          toy: {
            to: '/store/category/toy',
            text: 'Игрушки'
          },
          pictures: {
            to: '/store/category/pictures',
            text: 'Картины'
          },
          cachepot: {
            to: '/store/category/cachepot',
            text: 'Кашпо'
          },
          book: {
            to: '/store/category/book',
            text: 'Книги'
          },
          basket: {
            to: '/store/category/basket',
            text: 'Корзины'
          },
          cosmetic: {
            to: '/store/category/cosmetic',
            text: 'Косметика'
          },
          kitchentextile: {
            to: '/store/category/kitchentextile',
            text: 'Кухонный текстиль'
          },
          macrame: {
            to: '/store/category/macrame',
            text: 'Макраме'
          },
          soap: {
            to: '/store/category/soap',
            text: 'Мыло'
          },
          postcard: {
            to: '/store/category/postcard',
            text: 'Открытки'
          },
          plate: {
            to: '/store/category/plate',
            text: 'Подставки'
          },
          linen: {
            to: '/store/category/linen',
            text: 'Полотенца'
          },
          bedsheet: {
            to: '/store/category/bedsheet',
            text: 'Постельное белье'
          },
          dish: {
            to: '/store/category/dish',
            text: 'Посуда'
          },
          board: {
            to: '/store/category/board',
            text: 'Разделочные доски'
          },
          candle: {
            to: '/store/category/candle',
            text: 'Свечи'
          },
          bag: {
            to: '/store/category/bag',
            text: 'Сумки'
          },
          driedflower: {
            to: '/store/category/driedflower',
            text: 'Сухоцветы'
          }
        },
        rooms: {
          aroma: {
            to: '/store/room/aroma',
            text: 'Ароматы'
          },
          bath: {
            to: '/store/room/bath',
            text: 'Ванная'
          },
          outside: {
            to: '/store/room/outside',
            text: 'Вне дома'
          },
          guest: {
            to: '/store/room/guest',
            text: 'Гостиная'
          },
          child: {
            to: '/store/room/child',
            text: 'Дети'
          },
          bed: {
            to: '/store/room/bed',
            text: 'Спальня'
          },
          dinning: {
            to: '/store/room/dinning',
            text: 'Столовая'
          },
          kitchen: {
            to: '/store/room/kitchen',
            text: 'Кухня'
          }
        },
        links: [{
          to: '/store/category/all',
          text: 'Весь каталог'
        }, {
          to: '/delivery',
          text: 'Доставка и оплата'
        }, {
          to: '/rent',
          text: 'Аренда пространства'
        }, {
          to: '/about',
          text: 'О нас'
        }],
        redLinks: ['/store/category/sale']
      };
    },
    computed: {
      items () {
        return this.$store.state.shop.items;
      },
      byCategory () {
        const list: string[] = [];

        Object.keys(this.items)
          .forEach(key => {
            this.items[key].category
              .forEach(function (categoryName : string) {
                if (list.findIndex((element) => element === categoryName) > -1) return;
                list.push(categoryName);
              })
          });

        return Object.keys(this.categories)
          .map(category => {
            if (list.indexOf(category) > -1)
              return this.categories[category]
          });
      },
      byRoom () {
        const list: string[] = [];

        Object.keys(this.items).forEach(key => {
          this.items[key].room.forEach(function (roomName : string) {
            if (list.findIndex((element) => element === roomName) > -1) return;
            list.push(roomName);
          })
        });

        return Object.keys(this.rooms)
          .map(room => {
            if (list.indexOf(room) > -1)
              return this.rooms[room]
          });
      }
    },
    methods: {
      getLinkClass (link) {
        return {
          'catalogue-list__link': true,
          'catalogue-list__link--red': this.redLinks.indexOf(link.to) > -1
        }
      }
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
    transition: color 0.6s;
  }
  .catalogue-list__link--red {
    color: var(--sale-red);
    font-weight: bold;
  }
  .catalogue-list__link:hover,.catalogue-list__link:active {
    color: var(--dark-blue);
    transition-duration: 0s;
  }
  .catalogue-list__link:focus {
    text-decoration: underline;
  }
</style>