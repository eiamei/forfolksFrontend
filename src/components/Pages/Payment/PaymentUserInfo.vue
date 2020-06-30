<template>
  <div class="user-info">
    <form class="user-info__form" @submit.prevent="checkForm">
      <div class="user-info__header">Контактная информация</div>
      <input v-validate="'required'" v-model="form.name" type="text" class="user-info__input" name="name" placeholder="Имя"/>
      <span class="user-info__error">{{ parseError(errors.first('name')) }}</span>
      <input v-validate="'required'" v-model="form.email" type="email" class="user-info__input" name="email" placeholder="Email"/>
      <span class="user-info__error">{{ parseError(errors.first('email')) }}</span>
      <div class="user-info__additional-info"> Мы не будем спамить, просто вышлем вам информацию о заказе и реквизиты для оплаты</div>
      <input v-validate="'required'" v-model="form.phone" type="tel" class="user-info__input" name="phone" placeholder="Номер телефона"/>
      <span class="user-info__error">{{ parseError(errors.first('phone')) }}</span>
      <div class="user-info__additional-info"> На случай, если возникнет необходимость связаться с вами и уточнить детали заказа или доставки</div>
      <textarea class="user-info__input user-info__input--text-area" v-model="form.comment" name="comment" placeholder="Комментарий"></textarea>
      <p class="user-info__additional-info">В Санкт-Петербурге возможен самовывоз от станции метро Василеостровская. <br>Если вы хотите оформить доставку, пожалуйста, выберите пункт "доставка" и заполните поля ниже</p>
      <div @click="changeDeliveryType">
        <button
          class="clean-button user-info__delivery-button"
          :class="isSelected(DELIVERY_TYPES.SELF)"
          type="button" 
          :data-delivery-type="DELIVERY_TYPES.SELF"
        >
          Самовывоз
        </button>
        <button
          class="clean-button user-info__delivery-button" 
          :class="isSelected(DELIVERY_TYPES.SHIPPING)"
          type="button" 
          :data-delivery-type="DELIVERY_TYPES.SHIPPING"
        >
          Доставка
        </button>
      </div>
      <template v-if="deliveryType === DELIVERY_TYPES.SELF">
        <p class="regular-sans-text user-info__delivery-info-text">После подтверждения заказа и оплаты мы договоримся об удобном времени для самовывоза.</p>
        <p class="regular-sans-text user-info__delivery-info-text">Наш шоурум находится по адресу Санкт-Петербург, 13-линия В.О., д. 72, "Артмуза", 3 этаж пом. 312</p>
      </template>
      <template v-else>
        <p class="user-info__header">Информация для доставки</p>
        <p class="regular-sans-text user-info__delivery-info-text">После подтверждения заказа мы рассчитаем стоимость доставки. Примерную цену и сроки доставки вы можете посмотреть на сайте boxberry.</p>
        <input class="user-info__input" v-model="form.country" name="country" placeholder="Страна"/>
        <input class="user-info__input" v-model="form.city" name="city" placeholder="Город"/>
        <span style="display: flex; justify-content: space-between; width: 100%">
          <input class="user-info__input user-info__input--postal" v-model="form.postal" name="postal" placeholder="Индекс"/>
          <input class="user-info__input user-info__input--address" v-model="form.address" name="address" placeholder="Адрес"/>
        </span>
      </template>
      <app-button class="user-info__end-order button--end-order" content="Завершить заказ"/>
    </form>
  </div>
</template>

<script>
import AppButton from '../../AppButton';
export default {
  name: 'PaymentUserInfo',
  components: {AppButton},
  data () {
    return {
      rules: {
        name: {
          required: true
        }
      },
      form: {
        name: '',
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
      deliveryType: 0
    }
  },
  methods: {
    parseError (error) {
      if (error && error.match(/field is required/))
        return 'Необходимо заполнить это поле';
      if (error && error.match(/valid email/))
        return 'Кажется, в введенном адресе есть ошибка';
      return error;
    },
    checkForm () {
      this.$validator._base.validateAll().then(isNoError => {
        if (isNoError) {
          let encoded = Object.keys(this.form).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.form[key])).join('&');
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
    isSelected (type) {
      return type === this.deliveryType ? 'user-info__delivery-button--selected' : '';
    }
  }
};
</script>

<style lang="scss">
  @import '../../../assets/styles/colors';
  @import '../../../assets/styles/vars';
  @import '../../../assets/styles/ui';
  .user-info {
    width: 100%;
    max-width: 600px;
    font-family: 'Roboto', 'Open Sans', serif;
    &__form {
      display: flex;
      flex-direction: column;
    }
    &__header {
      font-size: 20px;
      font-weight: 500;
      margin: 16px 0 10px 0;
    }
    &__input {
      width: calc(100% - 18px);
      max-width: calc(600px - 18px);
      height: 40px;
      border-radius: 4px;
      border: 1px solid $dark-gray;
      margin-top: 8px;
      padding: 0 8px;
      &--postal {
        width: 10%;
        min-width: 40px;
        margin-right: 8px;
      }
      &--address {
        width: 88%;
      }
      &--text-area {
        max-width: calc(600px - 18px);
        padding: 16px 8px;
      }
    }
    &__error {
      font-size: 12px;
      color: $regular-red
    }
    &__additional-info {
      font-size: 12px;
      color: $dark-gray2
    }
    &__delivery-button.clean-button {
      margin: 0.5rem 1rem 0.5rem 0;
      transform: 0.3s all;
      cursor: pointer;
    }
    &__delivery-button--selected {
      border-bottom: 1px solid $orange;
    }
    &__delivery-info-text.regular-sans-text {
      margin: 0.5rem 0;
      font-size: 0.85rem;
      text-transform: none;
      line-height: 1.4;
    }
    &__end-order {
      margin: 24px 0;
      align-self: flex-end;
    }
  }
</style>