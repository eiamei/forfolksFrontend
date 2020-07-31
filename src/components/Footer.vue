<template>
  <footer class="footer">
    <forfolks-logo class="footer__icon"/>
    <nav class="footer__linking-block">
      <div class="footer__links" v-for="(links, index) in linkBlock" :key="`links:${index}`">
        <router-link class="regular-sans-text footer__link" v-for="link in links" :to="link.href" :key="link.text">
          {{$t(link.text)}}
        </router-link>
      </div>
    </nav>
    <span style="display: flex; justify-content: space-between;">
      <nav class="footer__linking-block">
        <a v-for="link in socialLinks" :href="link.href" :key="link.href">
          <component class="footer__icon-link logo--gray" :is="link.component"/>
        </a>
      </nav>
      <nav class="footer__linking-block">
        <a v-for="link in paymentLinks" :href="link.href" :key="link.href">
          <component class="footer__icon-link footer__icon-link--payment logo--gray" :is="link.component"/>
        </a>
      </nav>
    </span>
  </footer>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {VueConstructor} from "vue";
    import VkLogo from './/Icons/Vk.vue';
    import FacebookLogo from './/Icons/Facebook.vue';
    import InstagramLogo from './/Icons/Instagram.vue';
    import AlphaLogo from './/Icons/AlphaLogo.vue';
    import VisaLogo from './/Icons/VisaLogo.vue';
    import MasterLogo from './/Icons/MasterLogo.vue';
    import MirLogo from './/Icons/MirLogo.vue';
    import ForfolksLogo from './/Icons/Logo.vue';
    import { link } from "../global";
    import { LocaleMessage } from "vue-i18n";

    interface footerLink {
        text: LocaleMessage,
        href: link
    }

    interface socialLink {
        href: link,
        component: VueConstructor
    }

    interface paymentLink {
        href: link,
        component: VueConstructor
    }

    type innerLinks = Array<footerLink>;

    interface footer {
        linkBlock: Array<innerLinks>,
        socialLinks: Array<socialLink>,
        paymentLinks: Array<paymentLink>
    }

    export default Vue.extend({
        name: 'AppFooter',
        components: { VkLogo, FacebookLogo, InstagramLogo, AlphaLogo, ForfolksLogo },
        data (): footer {
            return {
                linkBlock: [[{
                    text: 'footer.allItems',
                    href: '/store/category/all'
                // }, {
                //     text: 'footer.concrete',
                //     href: '/store/material/concrete'
                // }, {
                //     text: 'footer.dryFlower',
                //     href: '/store/material/dryflowers'
                // }, {
                //     text: 'footer.cotton',
                //     href: '/store/material/cotton'
                }], [{
                    text: 'footer.aboutUs',
                    href: '/about'
                }, {
                    text: 'footer.deliveryAndPayment',
                    href: '/delivery'
                }, {
                    text: 'Оферта',
                    href: '/contract'
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
                }],
                paymentLinks: [{
                    href: 'https://alfabank.ru/',
                    component: AlphaLogo
                }, {
                    href: 'https://www.visa.com.ru/',
                    component: VisaLogo
                }, {
                    href: 'https://www.mastercard.ru/',
                    component: MasterLogo
                }, {
                    href: 'https://mironline.ru/',
                    component: MirLogo
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
      width: 19rem;
        path {
          fill: white;
        }
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
      height: 2em;
      margin-right: 1em;
      &--payment {
        height: 1.5rem;
        width: auto;
      }
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