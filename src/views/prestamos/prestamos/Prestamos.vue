<template>
  <v-container fluid class="pb-12">
    <v-text-field
      rounded
      filled
      append-icon="mdi-magnify"
      label="Buscar un prestamo por nombre del material bibliográfico"
      class="px-lg-12 my-8"
    />
    <v-row align="center" justify="center" v-if="prestamos.length === 0">
      <span class="title px-6">
        Ups... No has solicitado ningún prestamo
      </span>
      <v-img src="@/assets/notFound.svg" height="400" class="ma-12" contain />
    </v-row>
    <div v-if="prestamos.length > 0 && !prestamoSearched.length > 0">
      <div class="title pa-8">Tus prestamos vigentes</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(prestamo, i) in prestamos"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="my-4"
        >
          <vPrestamos :item.sync="prestamo" />
        </v-col>
      </v-row>
    </div>
    <div v-if="prestamoSearched.length > 0 && search.length > 0">
      <div class="title pa-8">Resultados de tu busqueda: {{ search }}</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(prestamo, i) in prestamoSearched"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vPrestamos :item.sync="prestamo" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import socioStore from "@/store/socioStore";
export default {
  name: "socios",
  components: {
    vPrestamos: () => import("@/components/shared/CardPrestamos")
  },
  data: () => ({
    prestamos: [],
    search: "",
    prestamoSearched: []
  }),
  async mounted() {
    this.$store.registerModule("socioStore", socioStore);
    await this.sociosGetAll(this.$store.state.accessID);
    this.prestamos = this.arrayPrestamos;
  },
  beforeDestroy() {
    this.$store.unregisterModule("socioStore");
  },
  computed: {
    ...mapState("socioStore", { arrayPrestamos: "prestamos" })
  },
  methods: {
    ...mapActions("socioStore", {
      sociosGetAll: "getAllPrestamos"
    }),
    filterArray(value) {
      this.prestamoSearched = this.arrayPrestamos.map(
        element => (element.materialBibliografico.titulo = value)
      );
    }
  }
};
</script>

<style></style>
