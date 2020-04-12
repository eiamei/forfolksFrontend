import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from './en';
import { ru } from './ru/ru';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {en, ru}
});