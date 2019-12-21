<template>
  <v-container fluid class="pb-12">
    <v-card-title>Mis multas vigentes</v-card-title>
    <v-text-field
      rounded
      filled
      append-icon="mdi-magnify"
      label="Buscar un multa por nombre del material bibliográfico"
      class="px-lg-12 my-8"
    />
    <v-row align="center" justify="center" v-if="multas.length === 0">
      <span class="title px-6">
        Ups... No has solicitado ningún multa
      </span>
      <v-img src="@/assets/notFound.svg" height="400" class="ma-12" contain />
    </v-row>
    <div v-if="multas.length > 0 && !multaSearched.length > 0">
      <div class="title pa-8">Tus multas vigentes</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(multa, i) in multas"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="4"
          class="my-4"
        >
          <vMultas :item.sync="multa" />
        </v-col>
      </v-row>
    </div>
    <div v-if="multaSearched.length > 0 && search.length > 0">
      <div class="title pa-8">Resultados de tu busqueda: {{ search }}</div>
      <v-row align="center" justify="center">
        <v-col
          v-for="(multa, i) in multaSearched"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="my-4"
        >
          <vMultas :item.sync="multa" />
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
    vMultas: () => import("@/components/shared/CardMultas")
  },
  data: () => ({
    multas: [],
    search: "",
    multaSearched: []
  }),
  async mounted() {
    this.$store.registerModule("socioStore", socioStore);
    await this.sociosGetAll(this.$store.state.accessID);
    this.multas = this.arraymultas;
  },
  beforeDestroy() {
    this.$store.unregisterModule("socioStore");
  },
  computed: {
    ...mapState("socioStore", { arraymultas: "multas" })
  },
  methods: {
    ...mapActions("socioStore", {
      sociosGetAll: "getAllMultas"
    }),
    filterArray(value) {
      this.multaSearched = this.arraymultas.map(
        element => (element.prestamo.materialBibliografico.titulo = value)
      );
    }
  }
};
</script>

<style></style>
