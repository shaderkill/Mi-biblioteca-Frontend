import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

// Importaciones
let global = require("@/global/js/crud.js");

export default new Vuex.Store({
  state: {
    isLogged: null,
    accessEmail: null,
    accessPassword: null,
    accessID: null,
    darkMode: false
  },
  mutations: {
    setIsLogged: (state, response) => {
      state.isLogged = response;
    },
    setAccessEmail: (state, data) => {
      state.accessEmail = data;
    },
    setAccessPassword: (state, data) => {
      state.accessPassword = data;
    },
    setAccessID: (state, data) => {
      state.accessID = data;
    },
    setDarkMode: (state, data) => {
      state.darkMode = data;
    }
  },
  actions: {
    fetchLogin({ commit }) {
      commit("setAccessEmail", localStorage.getItem("accessEmail"));
      commit("setAccessPassword", localStorage.getItem("accessPassword"));
      commit("setAccessID", localStorage.getItem("accessID"));
    },
    fetchDarkMode({ commit }) {
      commit(
        "setDarkMode",
        localStorage.getItem("darkMode") === "true" ? true : false
      );
    },
    async login({ commit }, formData) {
      let dataResponse = await global.loginUser({ entity: "socios", formData });
      let response = dataResponse.status;
      localStorage.setItem("accessEmail", formData.email);
      localStorage.setItem("accessPassword", formData.password);
      localStorage.setItem("accessID", dataResponse.data.data);
      if (response === null || response === 401) return false;
      else if (response === 200) {
        commit("setIsLogged", true);
        return true;
      }
    },
    logout({ commit }) {
      localStorage.removeItem("darkMode");
      localStorage.removeItem("accessEmail");
      localStorage.removeItem("accessID");
      localStorage.removeItem("accessPassword");
      commit("setAccessEmail", null);
      commit("setAccessPassword", null);
      commit("setAccessID", null);
      commit("setDarkMode", null);
      router.push("login");
      Vue.toasted.success("Sesión finalizada con exito!", {
        icon: "mdi-checkbox-marked-circle"
      });
    },
    setDarkMode({ commit }, bool) {
      localStorage.setItem("darkMode", bool.toString());
      commit("setDarkMode", bool);
    }
  },
  modules: {}
});
