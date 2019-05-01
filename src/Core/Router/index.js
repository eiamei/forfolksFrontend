import Router from 'vue-router';
import Store from '../../Components/Pages/Store/Store';
import Item from '../../Components/Pages/Item/Item';
import Bag from '../../Components/Pages/Bag/Bag';
import Payment from '../../Components/Pages/Payment/Payment';
import About from '../../Components/Pages/About/About';

let config = {
  mode: 'history',
  routes: [
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/item',
      name: 'item',
      component: Item
    },
    {
      path: '/bag',
      name: 'Bag',
      component: Bag
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '*',
      redirect: '/store'
    }
  ]
};

let router = new Router(config);

export default router;