<template>
  <div class="delivery-and-payment">
    <article class="delivery-and-payment__article">
      <h1 class="centered-page__header">Доставка</h1>
      <h5 style="margin-top: 0">Самовывоз из шоурума</h5>
      <p>Санкт-Петербург, 13-линия В.О., д. 72, "Артмуза", 3 этаж пом. 312</p>
      <h5>Доставка по СПб</h5>
      <p>Яндекс доставка. День в день, стоимость зависит от вашего адреса.</p>
      <p>Сдэк. До ближайшего пункта выдачи. 1-2 рабочих дня. От 180 рублей. Цена зависит от объема посылки.</p>
      <h5>Достака по России и в другие страны</h5>
      <p>Сдэк, Почта России, Боксбери. Напишите нам и мы расчитаем предварительную стоимость доставки</p>
      <router-link to="about" class="delivery-and-payment__black-link">Контакты</router-link>
    </article>
    <article class="delivery-and-payment__article">
      <h1 class="centered-page__header">Оплата</h1>
      <p>После создания заказа мы подтвердим наличие и вышлем вам ссылку для оплаты. После успешной оплаты мы вышлем вам электронный чек. Обратите внимание, что резерв заказа без оплаты три дня, далее мы не гарантируем наличие товара</p>
    </article>
  </div>
</template>

<script>
export default {
  name: ''
};
</script>

<style lang="scss">
  @import '../components/Pages/CenteredPage';
  .delivery-and-payment {
    display: flex;
    flex-wrap: wrap;
    max-width: 80rem;
    align-self: center;
    margin: 3rem 1rem;
    justify-content: center;
    &__black-link {
      margin: 1rem 0 0 0;
      padding: 0.5rem 1rem;
      max-width: 6rem; // fallback
      width: max-content;
      background-color: black;
      border: 1px solid black;
      outline: transparent;
      cursor: pointer;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    &__article {
      display: flex;
      flex-direction: column;
      max-width: 35rem;
      min-width: 5rem;
      p {
        margin: 0;
      }
      &:first-child {
        max-width: 40rem;
        margin-right: 2rem;
      }
    }
  }
</style>