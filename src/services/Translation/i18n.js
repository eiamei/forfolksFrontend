import VueI18n from 'vue-i18n';

import en from './en';
import ru from './ru';
import Vue from 'vue';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {en, ru}
});