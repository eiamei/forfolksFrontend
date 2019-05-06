import Router from 'vue-router';
import Store from '../../Components/Pages/Store/Store';
import Item from '../../Components/Pages/Item/Item';
import Bag from '../../Components/Pages/Bag/Bag';
import Payment from '../../Components/Pages/Payment/Payment';
import About from '../../Components/Pages/About/About';
import STORE from '../../Core/Constants/Store';
import slugify from 'slugify';
import ruTranslate from '../../Core/Translation/ru';

let config = {
  mode: 'history',
  routes: [
    {
      path: '/store',
      name: 'store',
      component: Store,
      meta: {
        title: 'Магазин',
        tags: [{
          name: 'Description',
          content: 'Магазин Forfolks. Мы производим бетонные горшки и кашпо, бетонные вазы, бетонные подсвечники, латунные подсвечники, бетонные подставки и подносы ручной работы'
        }, {
          name: 'og:Description',
          content: 'Магазин Forfolks. Мы производим бетонные горшки и кашпо, бетонные вазы, бетонные подсвечники, латунные подсвечники, бетонные подставки и подносы ручной работы'
        }]
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'О нас',
        tags: [{
          name: 'Description',
          content: 'Forfolks. Мы производим бетонные горшки и кашпо, бетонные вазы, бетонные подсвечники, латунные подсвечники, бетонные подставки и подносы ручной работы'
        }, {
          name: 'og:Description',
          content: 'Forfolks. Мы производим бетонные горшки и кашпо, бетонные вазы, бетонные подсвечники, латунные подсвечники, бетонные подставки и подносы ручной работы'
        }]
      }
    },
    {
      path: '/item',
      name: 'item',
      component: Item,
      meta: {
        title: 'Forfolks',
        tags: []
      }
    },
    {
      path: '/bag',
      name: 'Bag',
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
      name: 'Payment',
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
      redirect: '/store'
    }
  ]
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
    if (to.path === '/item') {
      let item = STORE.find(item => slugify(item.name.toLowerCase()) === to.query.name && slugify(item.type.toLowerCase()) === to.query.type);
      if (item) {
        document.title = `${ruTranslate.items[item.type]} ${item.name} ${item.model} - Forfolks`;
        Array.from(document.querySelectorAll('[programmatic-meta]')).map(el => el.parentNode.removeChild(el));
        const tag = document.createElement('meta');
        tag.setAttribute('name', 'Description');
        tag.setAttribute('content', item.metaDesc || item.shortDesc);
        tag.setAttribute('programmatic-meta', '');
        document.head.appendChild(tag);
        const tag2 = document.createElement('meta');
        tag2.setAttribute('name', 'og:Description');
        tag2.setAttribute('content', item.metaDesc || item.shortDesc);
        tag2.setAttribute('programmatic-meta', '');
        document.head.appendChild(tag2);
      }
    }
  } catch (e) {
    console.warn(e);
  }
  next();
});

router.afterEach(to => {
  if (process.env.NODE_ENV !== 'production') return;
  if ('ga' in window && 'getAll' in window.ga) {
    let tracker = window.ga.getAll()[0];
    if (tracker) {
      tracker.set({
        page: to.fullPath
      });
      tracker.send('pageview');
    }
  }
});

export default router;