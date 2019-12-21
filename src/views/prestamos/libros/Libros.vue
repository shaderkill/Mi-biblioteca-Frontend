<template>
  <v-container fluid class="pb-12">
    <v-card-title>Libros</v-card-title>
    <v-text-field
      rounded
      filled
      append-icon="mdi-magnify"
      label="Buscar un libro por nombre"
      class="px-lg-12 my-8"
    />
    <v-row align="center" justify="center" v-if="libros.length === 0">
      <span class="title px-6">
        Ups... No nos quedan libros disponibles, vuelve más tarde...
      </span>
      <v-img src="@/assets/notFound.svg" height="400" class="ma-12" contain />
    </v-row>
    <div v-if="libros.length > 0 && !librosSearched.length > 0">
      <div class="title pa-8">Libros recomendados</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(libro, i) in libros"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="6"
          class="my-4"
        >
          <vBooks :book.sync="libro" />
        </v-col>
      </v-row>
    </div>
    <div v-if="librosSearched.length > 0 && search.length > 0">
      <div class="title pa-8">Resultados de tu busqueda: {{ search }}</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(libro, i) in librosSearched"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vBooks :book.sync="libro" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import libroStore from "@/store/libroStore";
export default {
  name: "libros",
  components: {
    vBooks: () => import("@/components/shared/CardBook")
  },
  data: () => ({
    libros: [],
    search: "",
    librosSearched: []
  }),
  async mounted() {
    this.$store.registerModule("libroStore", libroStore);
    await this.librosGetAll();
    this.libros = this.arrayLibros;
  },
  beforeDestroy() {
    this.$store.unregisterModule("libroStore");
  },
  computed: {
    ...mapState("libroStore", { arrayLibros: "arrayEntity" })
  },
  methods: {
    ...mapActions("libroStore", {
      librosGetAll: "getAll",
      libroGetByID: "getByID"
    }),
    filterArray(value) {
      this.librosSearched = this.arrayLibros.map(
        element => (element.materialBibliografico.titulo = value)
      );
    }
  }
};
</script>

<style></style>
