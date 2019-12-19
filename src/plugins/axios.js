// Configuración de AXIOS
import Vue from "vue";
const axios = require("axios");

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

axios.create(config);

axios.interceptors.request.use(
  function(config) {
    // eslint-disable-next-line no-console
    console.log(config);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // eslint-disable-next-line no-console
    console.log(response);
    if (
      response.status === 201 ||
      (response.status === 200 && response.config.method === "delete")
    )
      Vue.toasted.success("Acción completada con exito!", {
        icon: "mdi-check",
        className: ["success"]
      });
    return response;
  },
  function(error) {
    // eslint-disable-next-line no-console
    console.log(error.response);
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      }
    },
    $axios: {
      get() {
        return axios;
      }
    }
  });
};

Vue.use(Plugin);

// Metodo CRUDS

/**
 * Clase generadora de endpoints CRUD para diferentes entidades
 * @param URL as String de la ruta HTTP.
 * @author Cristian Molina
 * @functions createEntity - CreateEntities - createdCRUDEndpoints
 * @methods inside a entity: getALL, getByID, create, update, delete
 */
export class API {
  // Constructor de la clase API
  constructor({ url }) {
    this.url = url;
    this.endPoints = {};
  }

  /**
   *  Se crea y se guarda una entidad por defecto.
   */
  createEntity(entity) {
    this.endPoints[entity.name] = this.createdCRUDEndpoints(entity);
  }

  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(entity => this.createEntity(entity));
  }

  /**
   *  Se generan los endpoints basicos para poder utilizar las operaciones basicas de CRUD
   */
  createdCRUDEndpoints({ name }) {
    var endpoints = {};

    const resourceURL = `${this.url}/${name}`;

    endpoints.getAll = ({ query } = {}) =>
      axios.get(resourceURL, { params: { query } });

    endpoints.getByID = ({ id }) => axios.get(`${resourceURL}/${id}`);

    endpoints.create = ({ toCreate }) => axios.post(resourceURL, toCreate);

    endpoints.update = ({ toUpdate }) =>
      axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate);

    endpoints.delete = ({ id }) => axios.delete(`${resourceURL}/${id}`);

    endpoints.loginUser = ({ formData }) =>
      axios.post(`${resourceURL}/login`, {}, { headers: formData });

    endpoints.uploadImg = ({ dataForm }) => {
      let file = dataForm.img;
      let id = dataForm.id;
      let formData = new FormData();
      formData.append("imgBiblio", file, file.name);
      return axios.post(`${resourceURL}/${id}/upload`, formData);
    };

    return endpoints;
  }
}
