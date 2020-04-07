<template>
  <footer class="footer">
    <nav class="footer-social-links">
      <h4>Следите за нами в социальных сетях</h4>
      <span style="align-self: center">
        <a href="https://vk.com/weareforfolks" target="_blank">
          <img class="footer-social-links__link" src="../assets/svg/vk-logo.svg" alt="vk"/>
        </a>
        <a href="https://instagram.com/weareforfolks" target="_blank">
          <img class="footer-social-links__link" src="../assets/svg/instagram-logo.svg" alt="instagram"/>
        </a>
        <a href="https://facebook.com/weareforfolks" target="_blank">
          <img class="footer-social-links__link" src="../assets/svg/facebook-logo.svg" alt="instagram"/>
        </a>
      </span>
    </nav>
    <div class="footer-inner-links-wrapper">
      <nav class="footer-inner-links">
        <h4>Загляните сюда</h4>
        <router-link to="/store/material/concrete">Бетон</router-link>
        <router-link to="/store/material/cotton"> Хлопок</router-link>
        <router-link to="/store/material/dryflower">Сухоцветы</router-link>
      </nav>
      <nav class="footer-inner-links">
        <h4>Полезная информация</h4>
        <router-link to="/about">О нас</router-link>
        <router-link to="/delivery">О доставке и оплате</router-link>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    padding: 3rem 0;
    width: 100%;
    align-self: center;
    border-top: 1px solid lightgray;
  }
  .footer-social-links {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    h4 {
      font-weight: normal;
    }
    &__link {
      width: 2rem;
      height: 2rem;
      padding: 0 0.75rem;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .footer-inner-links-wrapper {
    display: flex;
    align-self: center;
  }
  .footer-inner-links {
    display: flex;
    flex-direction: column;
    margin: 1rem 1rem 0 1rem;
    h4 {
      font-weight: 700;
      margin: 0.5rem 0;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
</style>