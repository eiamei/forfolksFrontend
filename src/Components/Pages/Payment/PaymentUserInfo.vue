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
      <div class="user-info__header">Информация о доставке</div>
      <div class="user-info__additional-info">В Санкт-Петербурге возможен самовывоз от станции метро Василеостровская. Если вы хотите оформить доставку, пожалуйста, заполните поля ниже</div>
      <input class="user-info__input" v-model="form.country" name="country" placeholder="Страна"/>
      <input class="user-info__input" v-model="form.city" name="city" placeholder="Город"/>
      <span style="display: flex; justify-content: space-between; width: 100%">
        <input class="user-info__input user-info__input--postal" v-model="form.postal" name="postal" placeholder="Индекс"/>
        <input class="user-info__input user-info__input--address" v-model="form.address" name="address" placeholder="Адрес"/>
      </span>
      <app-button class="user-info__end-order button--end-order" content="Завершить заказ"/>
    </form>
  </div>
</template>

<script>
import AppButton from '../../../Core/Components/UI/AppButton';
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
      }
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
    }
  }
};
</script>

<style lang="scss">
  @import '../../../assets/styles/colors';
  .user-info {
    /*margin-top: 60px;*/
    width: 100%;
    max-width: 600px;
    &__form {
      display: flex;
      flex-direction: column;
    }
    &__header {
      font-size: 20px;
      font-weight: 500;
      margin: 24px 0 10px 0;
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
    &__end-order {
      margin: 24px 0;
      align-self: flex-end;
    }
  }
</style>