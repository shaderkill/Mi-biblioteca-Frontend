import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#00bfa5",
        secondary: "#afb42b",
        accent: "#b54f85",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        back: "#FAFAFA"
      },
      dark: {
        primary: "#00bfa5",
        secondary: "#afb42b",
        accent: "#b54f85",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        back: "#303030"
      }
    }
  },
  lang: {
    locales: { es },
    current: "es"
  }
});
