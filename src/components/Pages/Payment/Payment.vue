<template>
  <div class="payment-page">
    <payment-user-info v-if="isSuccess === null" @confirmed="sendEmail" class="payment-page__user-info"/>
    <payment-cart v-if="isSuccess === null" class="payment-page__cart"/>
    <div v-if="isSuccess" class="payment-page__success">
      <h1>Заказ успешно отправлен</h1>
      <span>В ближайшее время мы вышлем вам информацию о заказе и реквизиты для оплаты</span>
    </div>
    <div v-else-if="isSuccess === false" class="payment-page__error">
      <h1>При отправке заказа возникла ошибка :C</h1>
      <span>Попробуйте обновить страницу или свяжитесь с нами если проблема повторится</span>
    </div>
  </div>
</template>

<script>
  import PaymentUserInfo from './PaymentUserInfo';
  import PaymentCart from './PaymentCart';
  import {PROMO} from '../../../constants/Globals';

  export default {
    name: 'PaymentPage',
    components: {PaymentCart, PaymentUserInfo},
    data () {
      return {
        isSuccess: null,
        isPromo: ((new Date()) < PROMO.CONSTANT_DISCOUNT_TILL) || localStorage.getItem('ip1')
      }
    },
    created () {
      if (!Object.keys(this.$store.state.bag.bag).length)
        this.$router.push('/store');
    },
    computed: {
      bag () {
        return Object.keys(this.$store.state.bag.bag).map((key, index) => {
            let price = this.$store.state.bag.bag[key].qty * this.$store.state.bag.bag[key].price;
            if ((this.total >= PROMO.CONSTANT_DISCOUNT_PRICE_CASE) && ((new Date()) < PROMO.CONSTANT_DISCOUNT_TILL))
              price = Math.round(price * PROMO.CONSTANT_DISCOUNT);
            else if (this.isPromo)
              price = Math.round(price * PROMO.DISCOUNT_PERCENT);
            let encoded = encodeURIComponent(`item ${index}`) + "=" + encodeURIComponent(`
              Имя: ${this.$store.state.bag.bag[key].name}
              Тип: ${this.$store.state.bag.bag[key].type}
              Артикул: ${this.$store.state.bag.bag[key].id}
              Количество: ${this.$store.state.bag.bag[key].qty}
              Стоимость: ${price}
            `);
            if (this.$store.state.bag.bag[key].props.length)
              this.$store.state.bag.bag[key].props.forEach(function (prop) {
                encoded += encodeURIComponent(`${prop.name}: ${prop.value}`)
              });
          return encoded;
        }
        ).join('&');
      },
      total () {
        let total = 0;
        let bag = this.$store.state.bag.bag;
        Object.keys(bag).forEach(id => {
          total += bag[id].qty * bag[id].price;
        });
        if ((total >= PROMO.CONSTANT_DISCOUNT_PRICE_CASE) && ((new Date()) < PROMO.CONSTANT_DISCOUNT_TILL))
          total = Math.round(total * PROMO.CONSTANT_DISCOUNT);
        else if (this.isPromo)
          total = Math.round(total * PROMO.DISCOUNT_PERCENT);
        return total;
      }
    },
    methods: {
      sendEmail (form) {
        const url = 'https://script.google.com/macros/s/AKfycbyCFXoKNRwDAFxoWjnTOgLnRd_5WTc9nLptKzzHJZ7l3oDJPdM_/exec';
        let request = new XMLHttpRequest();
        let encoded = form.concat('&', this.bag, '&', `total=${this.total}`);
        request.open('POST', url);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onreadystatechange = () => {
          if (request.responseText) {
            this.isSuccess = JSON.parse(request.responseText).result === 'success';
            if (this.isSuccess) {
              this.$store.dispatch('bag/empty');
            }
          }
          return;
        };
        request.send(encoded);
        if (localStorage.getItem('ip1')) localStorage.removeItem('ip1');
      }
    }
  };
</script>

<style lang="scss">
  .payment-page {
    margin-top: 48px;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    @media screen and (max-width: 770px) {
      padding: 0 16px;
    }
    @media screen and (max-width: 500px) {
      padding: 0 8px;
    }
    &__cart {
      width: 30%;
      min-width: 300px;
      margin-left: 16px;
      @media screen and (max-width: 740px) {
        display: none;
      }
    }
    &__success, &__error {
      width: 100%;
      margin-top: 10vh;
      text-align: center;
      padding: 8px 16px;
      h1 {
        font-weight: 200;
      }
    }
  }
</style>