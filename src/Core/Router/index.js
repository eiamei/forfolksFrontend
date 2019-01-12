import Router from 'vue-router';
import Store from '../../Components/Pages/Store/Store';
import Item from '../../Components/Pages/Item/Item'

let config = {
  mode: 'history',
  routes: [
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/about'
    },
    {
      path: '/item',
      name: 'item',
      component: Item
    },
    {
      path: '*',
      redirect: '/store'
    }
  ]
};

let router = new Router(config);

export default router;