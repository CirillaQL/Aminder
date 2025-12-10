import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  // 检测用户语言
  // 更多选项: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 将 i18n 实例传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  // 更多配置: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true, // 开发环境下开启调试
    fallbackLng: 'en', // 默认语言
    interpolation: {
      escapeValue: false, // React 默认已经转义防止 XSS
    },
    resources: {
      en: {
        translation: en
      },
      zh: {
        translation: zh
      }
    }
  });

export default i18n;
