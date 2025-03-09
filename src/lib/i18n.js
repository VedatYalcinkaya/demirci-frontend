import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dil dosyalarını içe aktarıyoruz
import translationTR from '../locales/tr/tr-translation.json';
import translationEN from '../locales/en/en-translation.json';
import translationDE from '../locales/de/de-translation.json';

// Kullanılabilir diller
export const languages = {
  tr: { nativeName: 'Türkçe', flag: '🇹🇷' },
  en: { nativeName: 'English', flag: '🇬🇧' },
  de: { nativeName: 'Deutsch', flag: '🇩🇪' }
};

// Çevirileri kaynaklar olarak ekliyoruz
const resources = {
  tr: {
    translation: translationTR
  },
  en: {
    translation: translationEN
  },
  de: {
    translation: translationDE
  }
};

i18n
  // Tarayıcı dilini algılama
  .use(LanguageDetector)
  // React i18next ile entegrasyon
  .use(initReactI18next)
  // i18n başlatma
  .init({
    resources,
    fallbackLng: 'tr', // Varsayılan dil
    debug: process.env.NODE_ENV === 'development', // Geliştirme modunda debug açık
    
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlıyor
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n; 