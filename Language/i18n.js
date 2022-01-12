import i18n from "i18next";
import LanguageDetector from "@os-team/i18next-react-native-language-detector";
import { initReactI18next } from "react-i18next";
import {en} from './en';
import {lt} from './lt';
import {ar} from './ar';
import {ru} from './ru';

const Lang =  async () =>{
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ['en', 'lt','ar','ru'],
      react: { 
        useSuspense: false //   <---- this will do the magic
      },
      // compatibilityJSON: 'v3',
      // we init with resources
  
      resources: {
        en: en,
        lt: lt,
        ru: ru,
        ar:ar,
      },
      debug: false,
      fallbackLng: 'lt',
  
      // have a common namespace used around the full app
      ns: ["translations"],
      defaultNS: "translations",
  
      keySeparator: false, // we use content as keys
  returnObjects:true,
      interpolation: {
        escapeValue: false
      }
  
    });

}
export default Lang;
