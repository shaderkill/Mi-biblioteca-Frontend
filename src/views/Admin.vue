<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, i) in linkAdmin" :key="i" cols="12" sm="3">
        <v-card
          :to="item.url"
          ripple
          color="primary darker-2"
          dark
          class="pa-6"
        >
          <v-card-title>{{ item.text }}</v-card-title>
          <v-card-text class="py-8">
            Sistema para administrar {{ item.text.toLowerCase() }} disponibles
            dentro de la plataforma
          </v-card-text>
          <v-divider />
          <v-card-actions class="py-4">
            <v-spacer />
            <v-btn text>
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AdminView",
  data: () => ({
    linkAdmin: [
      {
        text: "Bibliotecas",
        url: "/admin/biblioteca"
      },
      {
        text: "Paises",
        url: "/admin/pais"
      },
      {
        text: "Ciudades",
        url: "/admin/ciudad"
      },
      {
        text: "Categorias",
        url: "/admin/categoria"
      },
      {
        text: "Material bibliográficos",
        url: "/admin/materialbibliografico"
      },
      {
        text: "Libros",
        url: "/admin/libro"
      },
      {
        text: "Revistas",
        url: "/admin/revista"
      },
      {
        text: "Proyectos",
        url: "/admin/proyecto"
      },
      {
        text: "Prestamos",
        url: "/admin/prestamo"
      },
      {
        text: "Socios",
        url: "/admin/socio"
      },
      {
        text: "Estado Multa",
        url: "/admin/estadomulta"
      },
      {
        text: "Estado Prestamo",
        url: "/admin/estadoprestamo"
      },
      {
        text: "Multa",
        url: "/admin/multa"
      }
    ]
  }),
  methods: {
    obtenerColor(i) {
      if (i < 3) return "success";
      if (i < 6) return "warning";
      if (i < 9) return "error";
      if (i < 12) return "info";
    }
  }
};
</script>

<style></style>
