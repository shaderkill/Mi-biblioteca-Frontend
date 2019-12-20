<template>
  <div>
    <v-container fluid class="primary darken-1 elevation-4 background-card">
      <div class="pt-12 pb-4 px-lg-12">
        <v-card flat color="transparent" class="px-lg-12">
          <span class="display-1 white--text">Inicio</span>
          <v-menu bottom left max-width="400">
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                absolute
                right
                large
                v-on="on"
                color="secondary"
                class="mt-9 mx-12 elevation-4"
              >
                <v-icon large>mdi-plus</v-icon>
              </v-btn>
            </template>

            <v-list three-line>
              <v-subheader>Materiales bibliográficos</v-subheader>
              <v-list-item to="/materiales/libros">
                <v-list-item-avatar>
                  <v-icon>mdi-book</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="body-2">Libros</v-list-item-title>
                  <v-list-item-subtitle class="body-2">
                    Ven a ver y solicita los libros que necesites.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/materiales/proyectos">
                <v-list-item-avatar>
                  <v-icon>mdi-book-information-variant</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="body-2"
                    >Proyectos</v-list-item-title
                  >
                  <v-list-item-subtitle class="body-2">
                    Revisa los proyectos disponibles dentro de nuestra
                    plataforma.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/materiales/revistas">
                <v-list-item-avatar>
                  <v-icon>mdi-book-multiple</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="body-2">Revistas</v-list-item-title>
                  <v-list-item-subtitle class="body-2">
                    Aqui puedes encontrar muchas revistas interesantes.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card>
      </div>
    </v-container>
    <v-container fluid class="back py-12">
      <v-container>
        <v-card outlined class="pa-6">
          <v-row>
            <v-col cols="12" sm="12" md="5" lg="5">
              <v-img
                class="pa-8"
                contain
                src="@/assets/bookReading.svg"
                height="250"
              />
            </v-col>
            <v-col cols="12" sm="12" md="7" lg="7">
              <v-card-title class="display-2">Bienvenido</v-card-title>
              <v-card-text class="py-6">
                En nuestro sistema podras solicitar un libro, una revista e
                inclusive un proyecto realizado por otro estudiante.
              </v-card-text>
              <v-card-actions class="py-12">
                <v-spacer />
                <v-btn rounded color="primary" to="/materiales/libros">
                  Ver los libros disponibles
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
        <v-card-title class="py-12">
          Libros recien llegados
          <v-spacer />
          <v-btn to="/materiales/libros" text color="primary" rounded>
            Ver más <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card-title>
        <v-layout wrap align-center justify-center>
          <v-row justify="center" align="center">
            <v-col
              v-for="(libro, i) in libros"
              :key="i"
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <cardBook :book.sync="libro" v-if="i < 9" />
            </v-col>
          </v-row>
        </v-layout>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-card class="pa-6" outlined>
              <v-card-title>
                <v-chip color="info">Información</v-chip>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="12" md="8" lg="8">
                    <v-card-title>
                      Revisa tus préstamos vigentes
                    </v-card-title>
                    <v-card-text>
                      Solo debes acceder a tu cuenta de usuario y podras
                      realizar las consultas relacionadas a todos los prestamos
                      que has solicitado hasta la fecha.
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="12" md="4" lg="4">
                    <v-img contain src="@/assets/booking.svg" class="mt-8" />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn rounded outlined color="black" to="/prestamos">
                  Ver mis préstamos
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import libroStore from "@/store/libroStore";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "Home",

  components: {
    cardBook: () => import("@/components/shared/CardBook.vue")
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
.background-card {
  background-color: var(--v-primary-base);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='105' viewBox='0 0 80 105'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='death-star' fill='%232f2f2f' fill-opacity='0.1'%3E%3Cpath d='M20 10a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm15 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zM20 75a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zm30-65a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V10zm0 65a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V75zM35 10a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zM5 45a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10zm60 35a5 5 0 0 1 10 0v50a5 5 0 0 1-10 0V45zm0-35a5 5 0 0 1 10 0v20a5 5 0 0 1-10 0V10z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-repeat: repeat;
}
</style>
