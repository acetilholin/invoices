import VueI18n from 'vue-i18n'
import Vue from 'vue'
import general from './general'


Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'si',
    messages: general
})

export default i18n
