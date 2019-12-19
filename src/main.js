import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";

Vue.config.productionTip = false;

// register the plugin on vue
import Toasted from "vue-toasted";

const Options = {
  position: "top-center",
  duration: 3000,
  keepOnHover: true,
  fitToScreen: true,
  className: ["body-2"],
  containerClass: ["pa-2"],
  iconPack: "mdi",
  icon: "mdi-message",
  theme: "toasted-primary",
  closeOnSwipe: true
};
// you can also pass options, check options reference below
Vue.use(Toasted, Options);

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount("#app");
