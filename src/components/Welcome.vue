<template>
  <div>
    <v-carousel
      class="background-carousel"
      hide-delimiters
      cycle
      progress
      continuous
    >
      <v-carousel-item>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" class="pa-lg-12">
            <v-card-title class="white--text">Bienvenido!</v-card-title>
            <v-card-text class="white--text">
              En nuestro sistema podras solicitar un libro, una revista e
              inclusive un proyecto realizado por otro estudiante.
            </v-card-text>
            <v-card-actions class="py-12">
              <v-spacer />
              <v-btn rounded color="secondary" to="/materiales/libros">
                Solicitar un libro
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-img class="pa-12" contain src="@/assets/bookReading.svg" />
          </v-col>
        </v-row>
      </v-carousel-item>
      <v-carousel-item>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" class="pa-lg-12">
            <v-card-title class="white--text">
              ¿Quieres revisar tus préstamos vigentes?
            </v-card-title>
            <v-card-text class="white--text">
              Solo debes acceder a tu cuenta de usuario y podras realizar las
              consultas relacionadas a todos los prestamos que has solicitado
              hasta la fecha.
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn rounded color="secondary" to="/prestamos"
                >Ver mis préstamos</v-btn
              >
            </v-card-actions>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-img contain src="@/assets/booking.svg" />
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <v-card-title>Libros recien llegados</v-card-title>
      <v-layout wrap align-center justify-center class="my-6 mx-2">
        <v-row justify="center" align="center">
          <v-col
            v-for="(libro, i) in libros"
            :key="i"
            cols="12"
            sm="12"
            md="6"
            lg="6"
          >
            <cardBook :book.sync="libro" />
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import libroStore from "@/store/libroStore";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "HelloWorld",

  components: {
    cardBook: () => import("./shared/CardBook.vue")
  },

  data: () => ({
    libros: []
  }),

  async mounted() {
    await this.$store.registerModule("libroStore", libroStore);
    await this.libroGetAll();
    this.libros = this.arrayEntity;
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("libroStore");
  },

  computed: {
    ...mapState("libroStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("libroStore", {
      libroGetAll: "getAll",
      libroGetByID: "getByID",
      libroDelete: "deleteEntity",
      libroUpdate: "updateEntity",
      libroCreate: "saveEntity",
      libroClearEntity: "clearEntity"
    }),
    async getAll() {
      try {
        this.loading = true;
        await this.libroGetAll();
        this.items = this.arrayEntity;
      } catch (error) {
        this.$toasted.error(
          "No se han logrado obtener datos desde el servidor.",
          { icon: "mdi-alert " }
        );
      } finally {
        this.loading = false;
      }
    }
  }
});
</script>

<style scoped>
.background-carousel {
  background-color: var(--v-primary-base);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='105' viewBox='0 0 80 105'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='death-star' fill='%232f2f2f' fill-opacity='0.1'%3E%3Cpath d='M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-repeat: repeat;
}
</style>
