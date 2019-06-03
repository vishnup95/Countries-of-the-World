import Vue from 'vue'
import Vuetify, {
  VApp,
  VImg,
  VLayout,
  VDialog,
  VBtn,
  VCard,
  VDivider,
  VToolbar,VMenu,
  VProgressCircular

} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VImg,
    VLayout,
    VDialog,
    VBtn,
    VCard,
    VDivider,
    VToolbar,VMenu,
    VProgressCircular
  },
  iconfont: 'md',
})
