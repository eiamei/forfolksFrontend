<template>
  <nav :class="containerClass" @click="close" @scroll="scroll">
    <ul class="menu-catalogue">
      <li class="menu-catalogue__item" v-for="link in byCategory" :key="link.to">
        <router-link class="menu-catalogue__text" :to="link.to" replace>{{$t(link.text)}}</router-link>
      </li>
    </ul>
    <ul class="menu-catalogue">
      <li class="menu-catalogue__item" v-for="link in byRoom" :key="link.to">
        <router-link class="menu-catalogue__text" :to="link.to" replace>{{$t(link.text)}}</router-link>
      </li>
    </ul>
    <ul class="menu-links">
      <li class="menu-links__item" v-for="link in links" :key="link.to">
        <router-link class="menu-links__text" :to="link.to">{{$t(link.text)}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import AppButton from '../AppButton';

  export default {
    name: 'appHeaderMenu',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        byCategory: [{
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
    },
    computed: {
      menuText () {
        if (this.$route.path.includes('store')) {
          if (this.$route.params.type)
            return `items.${this.$route.params.type}s`;
          else if (this.$route.params.material)
            return `material.${this.$route.params.material}`;
        }
        return '';
      },
      containerClass () {
        return {
          'menu-container': true,
          'menu-container--shown': this.isOpen
        }
      }
    },
    methods: {
      close () {
        this.$emit('close');
      },
      scroll (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };
</script>

<style lang="scss">
  @import '../../assets/styles/vars';
  .menu-container {
    position: fixed;
    z-index: 11;
    display: flex;
    left: 0;
    top: 20px;
    width: 100%;
    height: 100vh;
    padding: 2.5rem 0.5rem;
    overflow: scroll;
    box-sizing: border-box;
    opacity: 0;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(0);
    visibility: hidden;
    transition: background-color 0.4s cubic-bezier(0.22, 0.61, 0.41, 1.08),
                backdrop-filter 0.8s cubic-bezier(0.22, 0.61, 0.41, 1.08),
                opacity 0.4s cubic-bezier(0.22, 0.61, 0.41, 1.08),
                visibility 0.4s cubic-bezier(0.22, 0.61, 0.41, 1.08) 0s;
    @media screen and (max-width: $mobile) {
      flex-direction: column;
    }
    &--shown {
      background-color: rgba(255, 255, 255, .8);
      backdrop-filter: blur(12px);
      opacity: 1;
      visibility: visible;
    }
    .menu-catalogue, .menu-links {
      padding: 0;
      margin: 1rem 4rem 2rem 0.5rem;
      white-space: nowrap;
      &__item {
        list-style: none;
        margin-top: 0.25rem;
      }
      &__text {
        font-weight: 400;
        font-size: 1.5rem;
        color: black;
        text-decoration: none;
        @media screen and (max-width: $mobile) {
          flex-direction: column;
          font-size: 2.5rem;
        }
        &:hover {
          color: $dark-blue;
        }
      }
    }
  }
</style>