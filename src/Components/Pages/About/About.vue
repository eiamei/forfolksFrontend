<template>
  <div class="about">
    <h1 class="about__header">Контакты</h1>
    <div class="about__contacts">
      <p>hello.forfolks@gmail.com</p>
      <p>+7 (999) 239-66-10</p>
      <span>
        <a href="https://vk.com/weareforfolks" target="_blank">
          <div class="about__vk"></div>
        </a>
        <a href="https://instagram.com/weareforfolks" target="_blank">
          <div class="about__instagram"></div>
        </a>
        <a href="https://facebook.com/weareforfolks" target="_blank">
          <div class="about__facebook"></div>
        </a>
      </span>
      <h5>Интернет магазин (самовывоз)</h5>
      <p class="about__address"> Санкт-Петербург, ул. Кораблестроителей 46к1В</p>
      <h5>Партнеры</h5>
      <span>
        <p class="about__store">KupiDari</p>
        <p class="about__address"> Санкт-Петербург, Лиговский проспект 74, Лофт проект этажи, этаж 2.0</p>
        <p class="about__store">Joy flower place</p>
        <p class="about__address"> Санкт-Петербург, ул. Марата 47</p>
        <p class="about__store">More flowers</p>
        <p class="about__address"> Санкт-Петербург, Большая Разночинная 16, 1 этаж, секция 119</p>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'aboutPage'
  };
</script>

<style lang="scss">
  .about {
    text-align: center;
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-bottom: 40px;
    &__header {
      font-weight: 300;
    }
    &__instagram, &__vk, &__facebook {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin: 0 8px;
      &:hover {
        transform: scale(1.1);
      }
    }
    &__instagram {
      background: url('../../../assets/svg/instagram-logo.svg') no-repeat;
    }
    &__vk {
      background: url('../../../assets/svg/vk-logo.svg') no-repeat;
    }
    &__facebook {
      background: url('../../../assets/svg/facebook-logo.svg') no-repeat;
    }
    &__store {
      margin: 16px 0 0 0;
    }
    &__address {
      font-size: 12px;
      margin: 8px 0 0 0;
    }
  }
</style>