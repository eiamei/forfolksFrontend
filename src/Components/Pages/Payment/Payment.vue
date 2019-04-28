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

  export default {
    name: 'PaymentPage',
    components: {PaymentCart, PaymentUserInfo},
    data () {
      return {
        isSuccess: null
      }
    },
    computed: {
      bag () {
        return Object.keys(this.$store.state.bag.bag).map((key, index) =>
          encodeURIComponent(`item ${index}`) + "=" + encodeURIComponent(`
          name: ${this.$store.state.bag.bag[key].name}
          model: ${this.$store.state.bag.bag[key].model}
          color: ${this.$store.state.bag.bag[key].color}
          qty: ${this.$store.state.bag.bag[key].qty}
          `)
        ).join('&');
      },
    },
    methods: {
      sendEmail (form) {
        const url = 'https://script.google.com/macros/s/AKfycbyCFXoKNRwDAFxoWjnTOgLnRd_5WTc9nLptKzzHJZ7l3oDJPdM_/exec';
        let request = new XMLHttpRequest();
        let encoded = form.concat('&', this.bag);
        request.open('POST', url);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onreadystatechange = () => {
          if (request.responseText) {
            this.isSuccess = JSON.parse(request.responseText).result === 'success';
            if (this.isSuccess)
              this.$store.dispatch('bag/empty');
          }
          return;
        };
        request.send(encoded);
      }
    }
  };
</script>

<style lang="scss">
  .payment-page {
    margin-top: 48px;
    display: flex;
    justify-content: center;
    &__user-info {
      margin-left: 40px;
      /*width: 50%;*/
    }
    &__cart {
      margin-left: 80px;
      width: 30%;
    }
    &__success, &__error {
      margin-top: 10vh;
      text-align: center;
      padding: 8px 16px;
      h1 {
        font-weight: 200;
      }
    }
  }
</style>