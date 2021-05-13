<template>
  <div class="user-info">
    <form class="user-info__form" @submit.prevent="checkForm">
      <div class="user-info__header">Контактная информация</div>
      <input v-validate="'required'" v-model="form.name" type="text" class="user-info__input" name="name" placeholder="Имя"/>
      <span class="user-info__error">{{ parseError(errors.first('name')) }}</span>
      <input v-validate="'required'" v-model="form.surname" type="text" class="user-info__input" name="surname" placeholder="Фамилия"/>
      <span class="user-info__error">{{ parseError(errors.first('surname')) }}</span>
      <input v-validate="'required'" v-model="form.email" type="email" class="user-info__input" name="email" placeholder="Email"/>
      <span class="user-info__error">{{ parseError(errors.first('email')) }}</span>
      <div class="user-info__additional-info"> Мы не будем спамить, просто вышлем вам информацию о заказе и реквизиты для оплаты</div>
      <input v-validate="'required'" v-model="form.phone" type="tel" class="user-info__input" name="phone" placeholder="Номер телефона"/>
      <span class="user-info__error">{{ parseError(errors.first('phone')) }}</span>
      <div class="user-info__additional-info"> На случай, если возникнет необходимость связаться с вами и уточнить детали заказа или доставки</div>
      <textarea class="user-info__input user-info__input--text-area" v-model="form.comment" name="comment" placeholder="Комментарий"></textarea>
      <p class="user-info__additional-info">В Санкт-Петербурге возможен самовывоз из шоурума. Подробнее смотрите в разделе самовывоз <br>Если вы хотите оформить доставку, пожалуйста, выберите пункт "доставка" и заполните поля ниже</p>
      <div @click="changeDeliveryType">
        <button
          class="clean-button user-info__delivery-button"
          :class="isSelected(deliveryType, DELIVERY_TYPES.SELF)"
          type="button" 
          :data-delivery-type="DELIVERY_TYPES.SELF"
        >
          Самовывоз
        </button>
        <button
          class="clean-button user-info__delivery-button" 
          :class="isSelected(deliveryType, DELIVERY_TYPES.SHIPPING)"
          type="button" 
          :data-delivery-type="DELIVERY_TYPES.SHIPPING"
        >
          Доставка
        </button>
      </div>
      <template v-if="deliveryType === DELIVERY_TYPES.SELF">
        <p class="regular-sans-text user-info__delivery-info-text">Вы можете выбрать удобный способ оплаты:</p>
        <div @click="changePaymentType">
          <button
            class="clean-button user-info__delivery-button" 
            :class="isSelected(paymentType, PAYMENT_TYPES.SHOWROOM)"
            type="button" 
            :data-payment-type="PAYMENT_TYPES.SHOWROOM"
          >
            Оплата в шоуруме
          </button>
          <button
            class="clean-button user-info__delivery-button"
            :class="isSelected(paymentType, PAYMENT_TYPES.ONLINE)"
            type="button" 
            :data-payment-type="PAYMENT_TYPES.ONLINE"
          >
            Оплата онлайн
          </button>
        </div>
        <p v-if="paymentType === PAYMENT_TYPES.SHOWROOM" class="regular-sans-text user-info__delivery-info-text">Без оплаты заказ резервируется на три дня. В дни проведения акций заказ без оплаты резервируется на один день. Мы принимаем наличные и банковские карты.</p>
        <p v-if="paymentType === PAYMENT_TYPES.ONLINE" class="regular-sans-text user-info__delivery-info-text">После подтверждения заказа мы вышлем вам ссылку на оплату. Заказ резервируется бессрочно.</p>
        <p class="regular-sans-text user-info__delivery-info-text">Наш шоурум находится по адресу Санкт-Петербург, 13-линия В.О., д. 72, "Артмуза", 3 этаж пом. 312</p>
      </template>
      <template v-else>
        <p class="user-info__header">Информация для доставки</p>
        <p class="regular-sans-text user-info__delivery-info-text">После подтверждения заказа мы рассчитаем стоимость доставки.</p>
        <input class="user-info__input" v-model="form.country" name="country" placeholder="Страна"/>
        <input class="user-info__input" v-model="form.city" name="city" placeholder="Город"/>
        <span style="display: flex; justify-content: space-between; width: 100%">
          <input class="user-info__input user-info__input--postal" v-model="form.postal" name="postal" placeholder="Индекс"/>
          <input class="user-info__input user-info__input--address" v-model="form.address" name="address" placeholder="Адрес"/>
        </span>
      </template>
      <label class="regular-sans-text user-info__license-agreement">
        <input v-validate="'required'" name="license" type="checkbox" :value="license"/>
        <p>Создавая заказ вы подтверждаете согласие с&nbsp;<router-link to="contract"> условием оферты</router-link></p>
      </label>
      <span class="user-info__error">{{ parseError(errors.first('license')) }}</span>
      <button class="user-info__end-order button--end-order">Завершить заказ</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PaymentUserInfo',
  data () {
    return {
      rules: {
        name: {
          required: true
        }
      },
      form: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        comment: '',
        country: '',
        city: '',
        zip: '',
        address: ''
      },
      DELIVERY_TYPES: {
        SELF: 0,
        SHIPPING: 1
      },
      PAYMENT_TYPES: {
        SHOWROOM: 0,
        ONLINE: 1
      },
      license: false,
      deliveryType: 0,
      paymentType: 0
    }
  },
  methods: {
    parseError (error) {
      if (error && error.match(/license/))
        return 'Для создания заказа необходимо согласие с условиями сервиса';
      if (error && error.match(/field is required/))
        return 'Необходимо заполнить это поле';
      if (error && error.match(/valid email/))
        return 'Кажется, в введенном адресе есть ошибка';
      return error;
    },
    checkForm () {
      this.$validator._base.validateAll().then(isNoError => {
        if (isNoError) {
          const formData = Object.assign({}, this.form);
          formData.deliveryType = this.deliveryType === this.DELIVERY_TYPES.SELF ? 'Самовывоз' : 'Доставка';
          formData.toPay = this.paymentType === this.PAYMENT_TYPES.SHOWROOM ? 'Шоурум' : 'Онлайн';
          let encoded = Object.keys(formData).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])).join('&');
          this.$emit('confirmed', encoded);
        }
      });
    },
    changeDeliveryType (event) {
      event.preventDefault;
      if (event.target.hasAttribute('data-delivery-type')) {
        this.deliveryType = Number(event.target.getAttribute('data-delivery-type'))
      }
    },
    changePaymentType (event) {
      event.preventDefault;
      if (event.target.hasAttribute('data-payment-type')) {
        this.paymentType = Number(event.target.getAttribute('data-payment-type'))
      }
    },
    isSelected (property, type) {
      return property === type ? 'user-info__delivery-button--selected' : '';
    }
  }
};
</script>

<style>
  .user-info {
    width: 100%;
    max-width: 600px;
  }
  .user-info__form {
    display: flex;
    flex-direction: column;
  }
  .user-info__header {
    font-weight: 500;
    margin: 16px 0 10px 0;
  }
  .user-info__input {
    width: calc(100% - 18px);
    max-width: calc(600px - 18px);
    height: 40px;
    border-radius: 4px;
    border: 1px solid var(--dark-gray);
    margin-top: 8px;
    padding: 0 8px;
  }
  .user-info__input--postal {
    width: 10%;
    min-width: 40px;
    margin-right: 8px;
  }
  .user-info__input--address {
    width: 88%;
  }
  .user-info__input--text-area {
    max-width: calc(600px - 18px);
    padding: 16px 8px;
  }
  .user-info__error {
    color: var(--red);
  }
  .user-info__error--license {
    text-align: right;
  }
  .user-info__additional-info {
    color: var(--dark-gray) 2;
  }
  .user-info__delivery-button.clean-button {
    margin: 0.5rem 1rem 0.5rem 0;
    cursor: pointer;
  }
  .user-info__delivery-button--selected {
    border-bottom: 1px solid var(--orange);
  }
  .user-info__delivery-info-text.regular-sans-text {
    margin: 0.5rem 0;
    text-transform: none;
  }
  .user-info__license-agreement {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-transform: none;
  }
  .user-info__license-agreement > input {
    margin: 0 0.5rem 0 0;
  }
  @media screen and (max-width: 764px) {
    .user-info__license-agreement > input {
      margin: 0 1rem 0 0;
    }
  }
  .user-info__end-order {
    margin: 24px 0;
    align-self: flex-end;
    background: var(--dark-blue);
    border: 1px solid var(--dark-blue);
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px 48px;
    color: white;
    width: 100%;
    max-width: 300px;
    font-weight: 700;
  }
  .user-info__end-order:hover {
    background: var(--dark-blue);
  }
</style>