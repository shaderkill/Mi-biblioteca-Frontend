<template>
  <v-container fluid class="pb-12">
    <v-card-title>Revistas</v-card-title>
    <v-text-field
      rounded
      filled
      append-icon="mdi-magnify"
      label="Buscar una revista por nombre"
      class="px-lg-12 my-8"
    />
    <v-row align="center" justify="center" v-if="revistas.length === 0">
      <span class="title px-6">
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
          lg="6"
          class="my-4"
        >
          <vBooks :revista.sync="revista" />
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
          <vBooks :revista.sync="revista" />
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
    vBooks: () => import("@/components/shared/CardRevista.vue")
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
