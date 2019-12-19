/**
 * Store de #Persona
 * Componente compuesto de:
 * - state (datos del componente)
 * - mutations (modificaciones de los datos del componente)
 * - actions (acciones relacionadas al componente)
 * - getters (metodos para obtener los objetos)
 */

// Importaciones
import Swal from "sweetalert2";
let global = require("@/global/js/crud.js");

// Logíca de la tienda
export default {
  namespaced: true,
  state: {
    entity: {},
    arrayEntity: []
  },
  mutations: {
    // Modificar el array completo
    setArray: (state, response) => {
      state.arrayEntity = response;
    },
    // Agregar al array
    addToArray: (state, item) => {
      state.arrayEntity.push(item);
    },
    // Limpiar el array
    clearArray: state => {
      state.arrayEntity = [];
    },
    // Modificar la entidad unitaria
    setEntity: (state, item) => {
      state.entity = item;
    },
    // Limpiar la entidad unitaria
    clearEntity: state => {
      state.entity = {};
    },
    // Elminar un objeto del array
    deleteItem: (state, item) => {
      return (state.arrayEntity = state.arrayEntity.filter(
        element => element !== item
      ));
    }
  },
  actions: {
    clearEntity({ commit }) {
      commit("clearEntity");
    },
    // Obtener todos
    async getAll({ commit }) {
      let response = await global.getAllFrom({ entity: "libros" });
      commit("setArray", response);
    },
    // Obtener por ID
    async getByID({ commit }, id) {
      let item = await global.getByIDFrom({
        entity: "libros",
        id: id
      });
      commit("setEntity", item);
    },
    // Guardar objeto
    async saveEntity({ dispatch, commit }, item) {
      global.createIn({ entity: "libros", item: item });
      dispatch("getAll");
      commit("clearEntity");
    },
    // Actualizar objeto
    async updateEntity({ dispatch }, item) {
      await global.updateIn({ entity: "libros", item: item });
      dispatch("getAll");
    },
    // Deshabilitar objeto
    async disableEntity(item) {
      let id = item.id;
      global.stateOf({ entity: "libros", id: id });
    },
    // Eliminar Objeto
    async deleteEntity({ commit }, item) {
      await Swal.fire({
        title: `¿Estas seguro de eliminarlo?`,
        text: "Esta acción no es reversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5ab55e",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, cancelar"
      }).then(result => {
        if (result.value) {
          let id = item.id;
          global.deleteFrom({ entity: "libros", id: id });
          commit("deleteItem", item);
        }
      });
    }
  },
  getters: {
    // Obtener todo el array
    getArrayEntity: state => {
      return state.arrayEntity;
    },
    // Obtener un item
    getEntity: state => {
      return state.entity;
    }
  }
};
