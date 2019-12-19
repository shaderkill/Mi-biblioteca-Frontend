<template>
  <v-container>
    <v-text-field
      rounded
      filled
      append-icon="mdi-magnify"
      label="Buscar proyecto por nombre"
    />
    <v-row align="center" justify="center" v-if="proyectos.length === 0">
      <span class="title">
        Ups... No nos quedan proyectos disponibles, vuelve más tarde...
      </span>
      <v-img src="@/assets/notFound.svg" height="400" class="ma-12" contain />
    </v-row>
    <div v-if="proyectos.length > 0 && !proyectosSearched.length > 0">
      <div class="title pa-8">proyectos recomendados</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(proyecto, i) in proyectos"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vBooks :book.sync="proyecto" />
        </v-col>
      </v-row>
    </div>
    <div v-if="proyectosSearched.length > 0 && search.length > 0">
      <div class="title pa-8">Resultados de tu busqueda: {{ search }}</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(proyecto, i) in proyectosSearched"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vBooks :book.sync="proyecto" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import proyectoStore from "@/store/proyectoStore";
export default {
  name: "proyectos",
  components: {
    vBooks: () => import("@/components/shared/CardBook")
  },
  data: () => ({
    proyectos: [],
    search: "",
    proyectosSearched: []
  }),
  async mounted() {
    this.$store.registerModule("proyectoStore", proyectoStore);
    await this.proyectosGetAll();
    this.proyectos = this.arrayproyectos;
  },
  beforeDestroy() {
    this.$store.unregisterModule("proyectoStore");
  },
  computed: {
    ...mapState("proyectoStore", { arrayproyectos: "arrayEntity" })
  },
  methods: {
    ...mapActions("proyectoStore", {
      proyectosGetAll: "getAll",
      proyectoGetByID: "getByID"
    }),
    filterArray(value) {
      this.proyectosSearched = this.arrayproyectos.map(
        element => (element.materialBibliografico.titulo = value)
      );
    }
  }
};
</script>

<style></style>
