import zhHans from "./extensions/translations/zh-Hans.json"
import zh from "./extensions/translations/zh.json"
export default {
  config: {
    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      'zh-Hans',
      'zh',
    ],
    translations: {
      'zh-Hans': zhHans,
      'zh': zh
    }
  },
  bootstrap(app) {
    console.log(app);
  },
};
