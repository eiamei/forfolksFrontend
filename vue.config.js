// vue.config.js
const products = require('./public/products.json');
const CreateFileWebpack = require('create-file-webpack')
const shuffle = require('./src/utils/shuffle');

const idList = products[1].map(function (item) {
  return item.id;
});

// update the items order
products[0] = shuffle(idList);

const productsJson = JSON.stringify(products, null, 2);

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // update an order of items on every build
      new CreateFileWebpack({
        path: './dist',
        fileName: 'products.json',
        content: productsJson
      })
    ]
  }
};