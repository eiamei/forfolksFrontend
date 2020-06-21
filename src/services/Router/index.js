import Router from 'vue-router';
import Vue from 'vue';
import Store from '../Store/index';

import ruTranslate from '../Translation/ru';

const Catalogue = () => import(/* webpackChunkName: "store-page" */'../../views/Store.vue');
const Item = () => import(/* webpackChunkName: "item-page" */'../../views/item/Item.vue');
const Bag = () => import(/* webpackChunkName: "bag-page" */'../../views/Bag.vue');
const Payment = () => import(/* webpackChunkName: "payment-page" */'../../components/Pages/Payment/Payment.vue');
const About = () => import(/* webpackChunkName: "about-page" */'../../views/About.vue');
const Delivery = () => import(/* webpackChunkName: "delivery-page" */'../../views/Delivery.vue');
const Landing = () => import(/* webpackChunkName: "landing-page" */'../../views/landing/Landing.vue');

Vue.use(Router);

let routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      title: 'Главная',
      tags: [{
        name: 'Description',
        content: 'Дизайн студия Forfolks. Мы производим бетонные горшки, бетонные вазы, бетонные подсвечники, бетонные подставки и подносы, панно и подвесы в технике макраме ручной работы'
      }, {
        name: 'og:Description',
        content: 'Дизайн студия Forfolks. Мы производим бетонные горшки, бетонные вазы, бетонные подсвечники, бетонные подставки и подносы, панно и подвесы в технике макраме ручной работы'
      }]
    }
  },
  {
    path: '/store/category/:type',
    name: 'storeByType',
    component: Catalogue,
    meta: {
      title: 'Магазин',
      tags: [{
        name: 'Description',
        content: 'Магазин Forfolks. В нашем магазине вы можете найти бетонные кашпо, бетонные вазы, бетонные подставки и подсвечники, подвесы и панно в технике макраме'
      }, {
        name: 'og:Description',
        content: 'Магазин Forfolks. В нашем магазине вы можете найти бетонные кашпо, бетонные вазы, бетонные подставки и подсвечники, подвесы и панно в технике макраме'
      }]
    }
  },
  {
    path: '/store/material/:material',
    name: 'storeByMaterial',
    component: Catalogue,
    meta: {
      title: 'Магазин',
      tags: [{
        name: 'Description',
        content: 'Магазин Forfolks. В нашем магазине вы можете найти бетонные кашпо, бетонные вазы, бетонные подставки и подсвечники, подвесы и панно в технике макраме'
      }, {
        name: 'og:Description',
        content: 'Магазин Forfolks. В нашем магазине вы можете найти бетонные кашпо, бетонные вазы, бетонные подставки и подсвечники, подвесы и панно в технике макраме'
      }]
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'О нас',
      tags: [{
        name: 'Description',
        content: 'Семейная дизайн студия Forfolks. Мы производим бетонные горшки и кашпо, бетонные вазы, бетонные подсвечники, латунные подсвечники, бетонные подставки и подносы ручной работы'
      }, {
        name: 'og:Description',
        content: 'Семейная дизайн студия Forfolks. Мы производим бетонные горшки и кашпо, бетонные вазы, бетонные подсвечники, латунные подсвечники, бетонные подставки и подносы ручной работы'
      }]
    }
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: Delivery,
    meta: {
      title: 'Доставка',
      tags: [{
        name: 'Description',
        content: ''
      }, {
        name: 'og:Description',
        content: ''
      }]
    }
  },
  {
    path: '/product/:root/:prop1?/:prop2?/:prop3?',
    name: 'product',
    component: Item,
    meta: {
      title: 'Forfolks',
      tags: []
    }
  },
  {
    path: '/bag',
    name: 'bag',
    component: Bag,
    meta: {
      title: 'Корзина',
      tags: [{
        name: 'robots',
        content: 'noindex'
      }]
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
    meta: {
      title: 'Оплата',
      tags: [{
        name: 'robots',
        content: 'noindex'
      }]
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

let config = {
  mode: 'history',
  routes
};

let router = new Router(config);

router.beforeEach((to, from, next) => {
  try {
    if (to.meta && to.meta.title) {
      document.title = `${to.meta.title} - Forfolks`;
    } else {
      document.title = 'Forfolks - Дизайн для современной жизни';
    }
    if (to.meta && to.meta.tags) {
      Array.from(document.querySelectorAll('[programmatic-meta]')).map(el => el.parentNode.removeChild(el));
      to.meta.tags.forEach(tag => {
        // console.log(tag);
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        metaTag.setAttribute('content', tag.content);
        metaTag.setAttribute('programmatic-meta', '');
        document.head.appendChild(metaTag);
      });
    }
    if (to.path.includes('/product')) {
      let item = Store.getters['shop/findItemByParam'](to.params);
      console.log(to, item);
      // let item: object;
      // let item = STORE.find(item => slugify(item.name.toLowerCase()) === to.query.name && slugify(item.type.toLowerCase()) === to.query.type);
      // if (item) {
      //   document.title = `${ruTranslate.items[item.type]} ${item.name} ${item.model} - Forfolks`;
      //   Array.from(document.querySelectorAll('[programmatic-meta]')).map(el => el.parentNode.removeChild(el));
      //   const tag = document.createElement('meta');
      //   tag.setAttribute('name', 'Description');
      //   tag.setAttribute('content', item.metaDesc || item.shortDesc);
      //   tag.setAttribute('programmatic-meta', '');
      //   document.head.appendChild(tag);
      //   const tag2 = document.createElement('meta');
      //   tag2.setAttribute('name', 'og:Description');
      //   tag2.setAttribute('content', item.metaDesc || item.shortDesc);
      //   tag2.setAttribute('programmatic-meta', '');
      //   document.head.appendChild(tag2);
      // }
    }
  } catch (e) {
    console.warn(e);
  }
  next();
});

router.afterEach(to => {
  window.scrollTo(0, 0);
});

export default router;