// vue.config.js
const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const CreateFileWebpack = require('create-file-webpack')
const shuffle = require('./src/utils/shuffle');
const slugify = require('slugify');
const products = require('./public/products.json');

const routes = ['/', '/about', '/delivery', '/contract', '/rent'];

const IDS = 0;
const LIST = 1;

const idList = products[LIST].map(function (item) {
  return item.id;
});

// update the items order
products[IDS] = shuffle(idList);

const productsJson = JSON.stringify(products, null, 2);

products[LIST].forEach(function (item, index) {

  if (item.availability <= 0) return;

  let path = `/product/${item.group}`;
  if (item.selectableProperty.length) {
    item.selectableProperty.forEach(property => {
      path += `/${slugify(property.value.toLowerCase())}`
    });
  }

  routes.push(path);
})

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: routes,
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      timeout: 6000000,
      maxConcurrentRoutes: 6,
      inject: {
        foo: 'bar'
      },
      headless: true,
      renderAfterDocumentEvent: 'x-app-rendered'
    })
  })
];

const plugins = [
  new CreateFileWebpack({
    path: './dist',
    fileName: 'products.json',
    content: productsJson
  })
]

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(...plugins);
    // if (process.env.NODE_ENV === 'production') {
    //   config.plugins.push(...productionPlugins);
    // }
  }
};