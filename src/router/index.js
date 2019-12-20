import Vue from "vue";
import VueRouter from "vue-router";
import Interface from "../layout/Interface.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "interface",
    component: Interface,
    redirect: "home",
    children: [
      {
        path: "home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue")
      },
      {
        path: "/admin/biblioteca",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_biblioteca" */ "../views/mantedores/biblioteca/Biblioteca.vue"
          )
      },
      {
        path: "/admin/biblioteca/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_biblioteca" */ "../views/mantedores/biblioteca/formulario/BiblioForm.vue"
          )
      },
      {
        path: "/admin/ciudad",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_ciudad" */ "../views/mantedores/ciudad/Ciudad.vue"
          )
      },
      {
        path: "/admin/ciudad/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_ciudad" */ "../views/mantedores/ciudad/formulario/CiudadForm.vue"
          )
      },
      {
        path: "/admin/pais",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_pais" */ "../views/mantedores/pais/Pais.vue"
          )
      },
      {
        path: "/admin/pais/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_pais" */ "../views/mantedores/pais/formulario/PaisForm.vue"
          )
      },
      {
        path: "/admin/materialbibliografico",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_materialBibliografico" */ "../views/mantedores/materialBibliografico/MaterialBibliografico.vue"
          )
      },
      {
        path: "/admin/materialbibliografico/img/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_materialBibliografico" */ "../views/mantedores/materialBibliografico/formulario/ImageForm.vue"
          )
      },
      {
        path: "/admin/materialbibliografico/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_materialBibliografico" */ "../views/mantedores/materialBibliografico/formulario/Form.vue"
          )
      },
      {
        path: "/admin/categoria",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_categoria" */ "../views/mantedores/categoria/Categoria.vue"
          )
      },
      {
        path: "/admin/categoria/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_categoria" */ "../views/mantedores/categoria/formulario/Form.vue"
          )
      },
      {
        path: "/admin/libro",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_libro" */ "../views/mantedores/libro/Libro.vue"
          )
      },
      {
        path: "/admin/libro/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_libro" */ "../views/mantedores/libro/formulario/Form.vue"
          )
      },
      {
        path: "/admin/revista",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_revista" */ "../views/mantedores/revista/Revista.vue"
          )
      },
      {
        path: "/admin/revista/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_revista" */ "../views/mantedores/revista/formulario/Form.vue"
          )
      },
      {
        path: "/admin/proyecto",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_proyecto" */ "../views/mantedores/proyecto/Proyecto.vue"
          )
      },
      {
        path: "/admin/proyecto/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_proyecto" */ "../views/mantedores/proyecto/formulario/Form.vue"
          )
      },
      {
        path: "/admin/prestamo",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/mantedores/prestamo/Prestamo.vue"
          )
      },
      {
        path: "/admin/prestamo/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/mantedores/prestamo/formulario/Form.vue"
          )
      },
      {
        path: "/admin/socio",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_socio" */ "../views/mantedores/socio/Socios.vue"
          )
      },
      {
        path: "/admin/socio/form/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_socio" */ "../views/mantedores/socio/formulario/Form.vue"
          )
      },
      {
        path: "/materiales/libros",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/prestamos/libros/Libros.vue"
          )
      },
      {
        path: "/materiales/libros/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/prestamos/libros/Detalle.vue"
          )
      },
      {
        path: "/materiales/revistas",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/prestamos/revistas/Revistas.vue"
          )
      },
      {
        path: "/materiales/revistas/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/prestamos/revistas/Detalle.vue"
          )
      },
      {
        path: "/materiales/proyectos",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/prestamos/proyectos/Proyectos.vue"
          )
      },
      {
        path: "/materiales/proyectos/:id?",
        component: () =>
          import(
            /* webpackChunkName: "mantenedor_prestamo" */ "../views/prestamos/proyectos/Detalle.vue"
          )
      },
      {
        path: "/configurar/:id",
        component: () =>
          import(
            /* webpackChunkName: "mis_datos" */ "../views/datosUsuario/DatosUsuario.vue"
          )
      },
      {
        path: "/prestamos",
        name: "prestamos",
        component: () =>
          import(
            /* webpackChunkName: "not-found" */ "../views/prestamos/prestamos/Prestamos.vue"
          )
      },
      {
        path: "/not-found/404",
        name: "not-found",
        component: () =>
          import(/* webpackChunkName: "not-found" */ "../views/notFound.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/loading",
    name: "loading",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Loading.vue")
  },

  {
    path: "**",
    redirect: "/not-found/404"
  },
  {
    path: "",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  function validateUser() {
    store.dispatch("fetchLogin");
    if (store.state.accessEmail && store.state.accessPassword) {
      if (store.state.accessID) {
        next();
      } else next("/loading");
    } else next("/login");
  }

  if (to.fullPath === "/login") next();
  else if (to.fullPath === "/loading") next();
  else if (from.fullPath === "/loading" && to.fullPath === "/home") next();
  else validateUser();
});

export default router;
