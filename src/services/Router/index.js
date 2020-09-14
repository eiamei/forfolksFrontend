import Router from 'vue-router';
import Vue from 'vue';
import products from '../../../public/products.json';
import groups from "../../constants/Groups.json";
import slugify from 'slugify';

const Catalogue = () => import(/* webpackChunkName: "store-page" */'../../views/Store.vue');
const Item = () => import(/* webpackChunkName: "item-page" */'../../views/item/Item.vue');
const Bag = () => import(/* webpackChunkName: "bag-page" */'../../views/Bag.vue');
const Payment = () => import(/* webpackChunkName: "payment-page" */'../../components/Pages/Payment/Payment.vue');
const About = () => import(/* webpackChunkName: "about-page" */'../../views/About.vue');
const Delivery = () => import(/* webpackChunkName: "delivery-page" */'../../views/Delivery.vue');
const Landing = () => import(/* webpackChunkName: "landing-page" */'../../views/landing/Landing.vue');
const Contract = () => import(/* webpackChunkName: "contract-page" */'../../views/Contract.vue');

Vue.use(Router);

let items = products
  .map(function (item) {
    try {
      if (groups[item.group])
        return Object.assign({}, groups[item.group], item);
      else
        return Object.assign({}, item)
    } catch (e) {
      return undefined;
    }
  })
  .filter(function (item) {
    return item !== undefined
});

function findByParam (routeParams) {
  let item;
  let params = {
    root: '',
    properties: []
  };
  Object
    .keys(routeParams)
    .forEach(function (param) {
      if (param === 'root')
        params.root = routeParams[param];
      else if (routeParams[param]) {
        params.properties.push(routeParams[param])
      }
    });
  try {
    item = items
      .find(function (item) {
        if (item.rootPath === params.root && item.selectableProperty.length === params.properties.length) {
          for (let i = 0, len = params.properties.length; i < len; i++) {
            const result = item.selectableProperty
              .find(function (property) {
                return property.value.toLowerCase() === params.properties[i].toLowerCase()
              })
            if (!result) return false;
          }
          return item;
        }
        return false
      });
  } catch (e) {
    console.log(e);
  }
  return item;
}

const typesMeta = {
  accessories: {
    title: 'Акссесуары',
    tags: [{
      name: 'og:title',
      content: 'Акссесуары'
    }, {
      name: 'description',
      content: 'Акссесуары для кухни, столовой и ванной комнаты в магазине forfolks. Здесь вы найдете зубные щетки, мыльницы, щетки для кухни, губки из люффы, мешочки, мочалки.'
    }, {
      name: 'og:description',
      content: 'Акссесуары для кухни, столовой и ванной комнаты в магазине forfolks. Здесь вы найдете зубные щетки, мыльницы, щетки для кухни, губки из люффы, мешочки, мочалки.'
    }, {
      name: 'og:image',
      content: require('../../assets/images/landing/landing-shop.jpg')
    }]
  }
}

let routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      title: 'Главная',
      tags: [{
        name: 'og:title',
        content: 'Главная'
      }, {
        name: 'description',
        content: 'Forfolks - небольшой семейный шоурум предметов интерьера и быта из Санкт-Петербурга. Наша идеология спрятана в нашем названии: "for folks", значит "для своих"'
      }, {
        name: 'og:description',
        content: 'Forfolks - небольшой семейный шоурум предметов интерьера и быта из Санкт-Петербурга. Наша идеология спрятана в нашем названии: "for folks", значит "для своих"'
      }, {
        name: 'og:image',
        content: require('../../assets/images/landing/landing-shop.jpg')
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
        name: 'og:title',
        content: 'Магазин'
      }, {
        name: 'description',
        content: 'Интернет магазин Forfolks. Каталог по категориям'
      }, {
        name: 'og:description',
        content: 'Интернет магазин Forfolks. Каталог по категориям'
      }, {
        name: 'og:image',
        content: require('../../assets/images/landing/landing-shop.jpg')
      }]
    }
  },
  {
    path: '/store/room/:room',
    name: 'storeByRoom',
    component: Catalogue,
    meta: {
      title: 'Магазин',
      tags: [{
        name: 'og:title',
        content: 'Магазин'
      }, {
        name: 'description',
        content: 'Интернет магазин Forfolks. Каталог по помещениям и назначению'
      }, {
        name: 'og:description',
        content: 'Интернет магазин Forfolks. Каталог по помещениям и назначению'
      }, {
        name: 'og:image',
        content: require('../../assets/images/landing/landing-shop.jpg')
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
        name: 'og:title',
        content: 'О нас'
      }, {
        name: 'description',
        content: 'Шоурум Forfolks. О нас. Санкт-Петербург, 13 линия Васильевского острова 72, помещение 312. График работы.'
      }, {
        name: 'og:description',
        content: 'Шоурум Forfolks. О нас. Санкт-Петербург, 13 линия Васильевского острова 72, помещение 312. График работы.'
      }, {
        name: 'og:image',
        content: require('../../assets/images/landing/landing-shop.jpg')
      }]
    }
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: Delivery,
    meta: {
      title: 'Оплата и доставка',
      tags: [{
        name: 'og:title',
        content: 'Оплата и доставка'
      }, {
        name: 'description',
        content: 'Интернет магазин Forfolks. Информацию об оплате и доставке.'
      }, {
        name: 'og:description',
        content: 'Интернет магазин Forfolks. Информацию об оплате и доставке.'
      }, {
        name: 'og:image',
        content: require('../../assets/images/landing/landing-shop.jpg')
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
    path: '/contract',
    name: 'contract',
    component: Contract,
    meta: {
      title: 'Оферта',
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

function setProgramaticTags (to) {
  if (!to.meta || !to.meta.tags) return;
  Array.from(document.querySelectorAll('[programmatic-meta]')).map(el => el.parentNode.removeChild(el));
  to.meta.tags.forEach(tag => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', tag.name);
    metaTag.setAttribute('property', tag.content);
    metaTag.setAttribute('programmatic-meta', "");
    document.head.appendChild(metaTag);
  });
}

router.beforeEach((to, from, next) => {
  try {
    if (to.meta && to.meta.title) {
      document.title = `${to.meta.title} - Forfolks`;
    } else {
      document.title = 'Forfolks - Дизайн для современной жизни';
    }
    if (to.path.includes('/product')) {
      let item = findByParam(to.params);
      if (item) {
        setProgramaticTags(to);

        let color = '';
        let model = '';
        item.selectableProperty.forEach(function (property) {
          if (property.name === 'color')
            color = property.text;
          if (property.name === 'model')
            model = property.text;
        })

        let title = item.name;
        if (item.type) title += ` ${item.type}`;
        if (color) title += ` ${color}`;
        if (model) title += ` ${model}`;
        title += ' - Forfolks';

        Array.from(document.querySelectorAll('[programmatic-meta]')).map(el => el.parentNode.removeChild(el));

        document.title = title

        const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.setAttribute('content', title);
        ogTitle.setAttribute('programmatic-meta', "");
        document.head.appendChild(ogTitle);

        const description = document.createElement('meta');
        description.setAttribute('name', 'description');
        description.setAttribute('content', `${title}. ${item.metaDesc || item.shortDesc}`);
        description.setAttribute('programmatic-meta', "");
        document.head.appendChild(description);

        const ogDescription = document.createElement('meta');
        ogDescription.setAttribute('name', 'og:description');
        ogDescription.setAttribute('property', `${title}. ${item.metaDesc || item.shortDesc}`);
        ogDescription.setAttribute('programmatic-meta', "");
        document.head.appendChild(ogDescription);

        let path = item.rootPath;
        if (item.selectableProperty.length)
          item.selectableProperty.forEach(property => {
            path += `-${slugify(property.value.toLowerCase())}`
          });
        let image = require(`../../assets/images/store/${path}-small.jpg`);

        const ogImage = document.createElement('meta');
        ogImage.setAttribute('name', 'og:image');
        ogImage.setAttribute('property', `${image}`);
        ogImage.setAttribute('programmatic-meta', "");
        document.head.appendChild(ogImage);
      }
    } else if (to.path.includes('/category')) {
      const type = to.params.type;
      const room = to.params.room;
      if (type) {
        const fakeTo = {
          meta: typesMeta[type]
        }
        if (to.meta && to.meta.title) {
          document.title = `${fakeTo.meta.title} - Forfolks`;
        } else {
          document.title = 'Forfolks - Дизайн для современной жизни';
        }
        setProgramaticTags(fakeTo);
      }
    } else {
      setProgramaticTags(to);
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