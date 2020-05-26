<template>
  <footer class="footer">
    <img class="footer__icon" src="../assets/svg/ForfolksLogo.svg"/>
    <nav class="footer__linking-block">
      <div class="footer__links" v-for="(links, index) in linkBlock" :key="`links:${index}`">
        <router-link class="regular-sans-text footer__link" v-for="link in links" :to="link.href" :key="link.text">
          {{$t(link.text)}}
        </router-link>
      </div>
    </nav>
    <nav class="footer__linking-block">
      <a v-for="link in socialLinks" :href="link.href" :key="link.href">
        <component class="footer__icon-link logo--gray" :is="link.component"/>
      </a>
    </nav>
  </footer>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {VueConstructor} from "vue";
    import VkLogo from './/Icons/Vk.vue';
    import FacebookLogo from './/Icons/Facebook.vue';
    import InstagramLogo from './/Icons/Instagram.vue';
    import { link } from "@/global";
    import { LocaleMessage } from "vue-i18n";

    interface footerLink {
        text: LocaleMessage,
        href: link
    }

    interface socialLink {
        href: link,
        component: VueConstructor
    }

    type innerLinks = Array<footerLink>;

    interface footer {
        linkBlock: Array<innerLinks>,
        socialLinks: Array<socialLink>
    }

    export default Vue.extend({
        name: 'footer',
        components: { VkLogo, FacebookLogo, InstagramLogo },
        data (): footer {
            return {
                linkBlock: [[{
                    text: 'footer.allItems',
                    href: '/store/category/all'
                }, {
                    text: 'footer.concrete',
                    href: '/store/material/concrete'
                }, {
                    text: 'footer.dryFlower',
                    href: '/store/material/dryflowers'
                }, {
                    text: 'footer.cotton',
                    href: '/store/material/cotton'
                }], [{
                    text: 'footer.aboutUs',
                    href: '/about'
                }, {
                    text: 'footer.deliveryAndPayment',
                    href: '/delivery'
                }]],
                socialLinks: [{
                    href: 'https://facebook.com/weareforfolks',
                    component: FacebookLogo
                }, {
                    href: 'https://instagram.com/weareforfolks',
                    component: InstagramLogo
                }, {
                    href: 'https://vk.com/weareforfolks',
                    component: VkLogo
                }]
            }
        }
    });
</script>

<style lang="scss">
  @import "src/assets/styles/vars";
  @import "src/assets/styles/ui";

  .footer {
    display: flex;
    flex-direction: column;
    padding: 5rem 2rem 2rem 2rem;
    background-color: $dark-blue;
    &__icon {
      width: 12.5rem;
    }
    &__linking-block {
      display: flex;
      margin: 3rem 0 0 0;
      flex-wrap: wrap;
    }
    &__links {
      display: flex;
      flex-direction: column;
      margin-right: 3rem;
    }
    &__icon-link {
      width: 2em;
      margin-right: 1em;
    }
    .regular-sans-text.footer__link {
      color: $light-gray;
      text-decoration: none;
      transition: 0.3s all;
      &:hover {
        color: white;
      }
    }
  }
</style>

<!--<template>-->
<!--  <footer class="footer">-->
<!--    <nav class="footer-social-links">-->
<!--      <h4>Следите за нами в социальных сетях</h4>-->
<!--      <span style="align-self: center">-->
<!--        <a href="https://vk.com/weareforfolks" target="_blank">-->
<!--          <img class="footer-social-links__link" src="../assets/svg/vk-logo.svg" alt="vk"/>-->
<!--        </a>-->
<!--        <a href="https://instagram.com/weareforfolks" target="_blank">-->
<!--          <img class="footer-social-links__link" src="../assets/svg/instagram-logo.svg" alt="instagram"/>-->
<!--        </a>-->
<!--        <a href="https://facebook.com/weareforfolks" target="_blank">-->
<!--          <img class="footer-social-links__link" src="../assets/svg/facebook-logo.svg" alt="instagram"/>-->
<!--        </a>-->
<!--      </span>-->
<!--    </nav>-->
<!--    <div class="footer-inner-links-wrapper">-->
<!--      <nav class="footer-inner-links">-->
<!--        <h4>Загляните сюда</h4>-->
<!--        <router-link to="/store/material/concrete">Бетон</router-link>-->
<!--        <router-link to="/store/material/cotton"> Хлопок</router-link>-->
<!--        <router-link to="/store/material/dryflower">Сухоцветы</router-link>-->
<!--      </nav>-->
<!--      <nav class="footer-inner-links">-->
<!--        <h4>Полезная информация</h4>-->
<!--        <router-link to="/about">О нас</router-link>-->
<!--        <router-link to="/delivery">О доставке и оплате</router-link>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </footer>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Footer'-->
<!--};-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  .footer {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    margin-top: 3rem;-->
<!--    padding: 3rem 0;-->
<!--    width: 100%;-->
<!--    align-self: center;-->
<!--    border-top: 1px solid lightgray;-->
<!--  }-->
<!--  .footer-social-links {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    align-self: center;-->
<!--    justify-content: center;-->
<!--    h4 {-->
<!--      font-weight: normal;-->
<!--    }-->
<!--    &__link {-->
<!--      width: 2rem;-->
<!--      height: 2rem;-->
<!--      padding: 0 0.75rem;-->
<!--      &:hover {-->
<!--        transform: scale(1.1);-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  .footer-inner-links-wrapper {-->
<!--    display: flex;-->
<!--    align-self: center;-->
<!--  }-->
<!--  .footer-inner-links {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    margin: 1rem 1rem 0 1rem;-->
<!--    h4 {-->
<!--      font-weight: 700;-->
<!--      margin: 0.5rem 0;-->
<!--    }-->
<!--    a {-->
<!--      text-decoration: none;-->
<!--      color: black;-->
<!--    }-->
<!--  }-->
<!--</style>-->