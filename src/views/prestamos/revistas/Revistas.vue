<template>
  <v-container>
    <v-text-field
      rounded
      filled
      append-icon="mdi-magnify"
      label="Buscar revista por nombre"
    />
    <v-row align="center" justify="center" v-if="revistas.length === 0">
      <span class="title">
        Ups... No nos quedan revistas disponibles, vuelve más tarde...
      </span>
      <v-img src="@/assets/notFound.svg" height="400" class="ma-12" contain />
    </v-row>
    <div v-if="revistas.length > 0 && !revistasSearched.length > 0">
      <div class="title pa-8">revistas recomendadas</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(revista, i) in revistas"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vBooks :book.sync="revista" />
        </v-col>
      </v-row>
    </div>
    <div v-if="revistasSearched.length > 0 && search.length > 0">
      <div class="title pa-8">Resultados de tu busqueda: {{ search }}</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(revista, i) in revistasSearched"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vBooks :book.sync="revista" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import revistaStore from "@/store/revistaStore";
export default {
  name: "revistas",
  components: {
    vBooks: () => import("@/components/shared/CardBook")
  },
  data: () => ({
    revistas: [],
    search: "",
    revistasSearched: []
  }),
  async mounted() {
    this.$store.registerModule("revistaStore", revistaStore);
    await this.revistasGetAll();
    this.revistas = this.arrayrevistas;
  },
  beforeDestroy() {
    this.$store.unregisterModule("revistaStore");
  },
  computed: {
    ...mapState("revistaStore", { arrayrevistas: "arrayEntity" })
  },
  methods: {
    ...mapActions("revistaStore", {
      revistasGetAll: "getAll",
      revistaGetByID: "getByID"
    }),
    filterArray(value) {
      this.revistasSearched = this.arrayrevistas.map(
        element => (element.materialBibliografico.titulo = value)
      );
    }
  }
};
</script>

<style></style>
