// Imports
import { apirest } from "./entidades";

/**
 * Obtener todo los elementos disponibles en la entidad a llamar.
 * @param entity as String
 * @author Cristian Molina*/
export function getAllFrom({ entity }) {
  return apirest.endPoints[entity].getAll().then(response => {
    if (!response) return null;
    else return response.data;
  });
}

/**
 * Obtener un elemento a buscar en la entidad a llamar.
 * @param entity as String
 * @param id as Number
 * @author Cristian Molina*/
export function getByIDFrom({ entity, id }) {
  return apirest.endPoints[entity].getByID({ id }).then(response => {
    if (!response) return null;
    else return response.data;
  });
}

/**
 * Crear un item/objeto dentro de la entidad.
 * @param entity as String
 * @param item as Object
 * @author Cristian Molina*/
export function createIn({ entity, item }) {
  return apirest.endPoints[entity].create({ toCreate: item }).then(response => {
    if (!response) return null;
    else return response;
  });
}

/**
 * Actualizar un item/objeto dentro de la entidad.
 * @param entity as String
 * @param item as Object
 * @author Cristian Molina*/
export function updateIn({ entity, item }) {
  return apirest.endPoints[entity].update({ toUpdate: item }).then(response => {
    if (!response) return null;
    else return response;
  });
}

/**
 * Eliminar un item/objeto dentro de la entidad.
 * @param entity as String
 * @param ID as Number
 * @author Cristian Molina*/
export function deleteFrom({ entity, id }) {
  return apirest.endPoints[entity].delete({ id }).then(response => {
    if (!response) return null;
    else return response;
  });
}

export function loginUser({ entity, formData }) {
  return apirest.endPoints[entity]
    .loginUser({ formData })
    .then(response => response)
    .catch(() => null);
}

/**
 * Obtener un elemento a buscar en la entidad a llamar.
 * @param entity as String
 * @param id as Number
 * @author Cristian Molina*/
export function uploadImg({ entity, dataForm }) {
  return apirest.endPoints[entity].uploadImg({ dataForm }).then(response => {
    if (!response) return null;
    else return response.data;
  });
}

/**
 * Solicitar un prestamo de material bibliográfico
 * @param entity as String
 * @param id as Number
 * @author Cristian Molina*/
export function solicitar({ entity, idUser, idBook }) {
  return apirest.endPoints[entity]
    .solicitar({ idUser, idBook })
    .then(response => {
      if (!response) return null;
      else return response.data;
    });
}

/**
 * Solicitar todos los prestamos según usuario
 * @param entity as String
 * @param id as Number
 * @author Cristian Molina*/
export function prestamosBySocio({ entity, id }) {
  return apirest.endPoints[entity].prestamosBySocio({ id }).then(response => {
    if (!response) return null;
    else return response.data;
  });
}
