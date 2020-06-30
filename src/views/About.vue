<template>
  <div class="about">
    <article class="about-contacts">
      <h1 class="about__header">Контакты</h1>
      <a href="mailto:hello@weareforfolks.com" class="about__mail">hello@weareforfolks.com</a>
      <p>+7 (999) 239-66-10</p>
      <h4>Интернет магазин (самовывоз)</h4>
      <p>Санкт-Петербург, 13-линия В.О., д. 72, "Артмуза", 3 этаж пом. 312</p>
      <p>График работы можно уточнить в социальных сетях, мессенджерах или по номеру телефона.</p>
      <nav class="about-contacts__links">
        <a href="https://vk.com/weareforfolks" target="_blank">
          <img class="about-contacts__link" src="../assets/svg/vk-logo.svg" alt="vk"/>
        </a>
        <a href="https://instagram.com/weareforfolks" target="_blank">
          <img class="about-contacts__link" src="../assets/svg/instagram-logo.svg" alt="instagram"/>
        </a>
        <a href="https://facebook.com/weareforfolks" target="_blank">
          <img class="about-contacts__link" src="../assets/svg/facebook-logo.svg" alt="instagram"/>
        </a>
      </nav>
    </article>
    <article class="about-partners">
      <h1 class="about__header">Партнеры</h1>
      <h4>KupiDari</h4>
      <p> Санкт-Петербург, Лиговский проспект 74, Лофт проект этажи, этаж 2.0</p>
      <h4>Ostrov</h4>
      <p> Санкт-Петербург, Лиговский проспект 74, Лофт проект этажи, этаж 2.0</p>
      <h4>Энди</h4>
      <p> Санкт-Петербург, ул. Гражданская 13-15, Бертгольд центр</p>
    </article>
    <article class="about-write-us">
      <h1 class="about__header">Напишите нам</h1>
      <p>Если у вас есть вопросы или комментарии о наших продуктах, пожалуйста, напишите нам.</p>
      <p>Также, если вы хотели бы быть представленными в нашем магазине или просто заинтересованы в сотрудничестве - смело пишите нам на почту <a href="mailto:join@weareforfolks.com" class="about__mail">join@weareforfolks.com</a> или в любой мессенджер. Мы всегда вам рады. </p>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'aboutPage'
  };
</script>

<style lang="scss">
  .about {
    display: flex;
    flex-wrap: wrap;
    margin: 3rem 1rem;
    max-width: 80rem;
    align-self: center;
    &__header {
      font-weight: 300;
    }
    &__mail {
      text-decoration: none;
      color: black;
    }
    &__instagram, &__vk, &__facebook {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin: 0 8px;
    }
    &__store {
      margin: 1rem 0 0 0;
    }
    &__address {
      font-size: 1rem;
      margin: 8px 0 0 0;
    }
  }
  .about-contacts, .about-partners, .about-write-us {
    margin: 0 2rem 0 0;
    min-width: 30%;
    max-width: 36rem;
  }
  .about-contacts {
    &__links {
      padding: 1rem 0 0 0;
    }
    &__link {
      width: 3rem;
      height: 3rem;
      padding: 0 2rem 0 0;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>