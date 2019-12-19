// Imports
import { API } from "@/plugins/axios";

//  "https://biblioteca-shaderkill-zmiize.herokuapp.com/biblio"
export const apiURL =
  "https://biblioteca-shaderkill-zmiize.herokuapp.com/biblio";
export const apirest = new API({ url: apiURL });
const entidades = [
  { name: "bibliotecas" },
  { name: "categorias" },
  { name: "ciudades" },
  { name: "estado_multas" },
  { name: "estado_prestamos" },
  { name: "libros" },
  { name: "materialbibliografico" },
  { name: "multas" },
  { name: "paises" },
  { name: "personas" },
  { name: "proyectos" },
  { name: "prestamos" },
  { name: "revistas" },
  { name: "socios" }
];
apirest.createEntities(entidades);
