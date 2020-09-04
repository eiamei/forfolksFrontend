// vue.config.js
const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const products = require('./public/products.json');
const slugify = require('slugify');
const routes = ['/', '/about', '/delivery'];

// products.forEach(function (item, index) {
//   let path = `/product/${item.group}`;
//   if (item.selectableProperty.length) {
//     item.selectableProperty.forEach(property => {
//       path += `/${slugify(property.value.toLowerCase())}`
//     });
//   }
//   routes.push(path);
// })

console.log(routes);

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
    }),
  }),
];

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  },
};