<template>
  <div class="background-complete pb-12">
    <v-container fluid class="pt-12 pb-12">
      <v-card flat color="transparent" class="px-6">
        <div class="display-1 white--text">Inicio</div>
        <v-menu bottom right max-width="400">
          <template v-slot:activator="{ on }">
            <v-btn
              large
              v-on="on"
              color="#22222222"
              dark
              depressed
              rounded
              class="mt-5"
            >
              <v-icon large class="mr-2">mdi-plus</v-icon>
              <span>Opciones</span>
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
                <v-list-item-title class="body-2">Proyectos</v-list-item-title>
                <v-list-item-subtitle class="body-2">
                  Revisa los proyectos disponibles dentro de nuestra plataforma.
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
    </v-container>

    <v-container>
      <v-card class="pa-6 mt-12">
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

      <v-divider class="my-12" />

      <v-card-title class="py-12">
        Libros recien llegados
        <v-spacer />
        <v-btn to="/materiales/libros" text color="primary" rounded>
          Ver más <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-title>

      <v-row v-if="libros.length > 0">
        <v-col
          v-for="(libro, i) in libros"
          :key="i"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <cardBook :book.sync="libro" v-if="i < 3" />
        </v-col>
      </v-row>

      <v-alert
        class="body-2 white--text text-center py-8"
        color="error"
        v-if="libros.length === 0"
      >
        Ups nos hemos quedado sin libros, vuelve más tarde!
      </v-alert>

      <v-card-title class="py-12">
        Ultimos proyectos
        <v-spacer />
        <v-btn to="/materiales/proyectos" text color="primary" rounded>
          Ver más <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-title>

      <v-row v-if="proyectos.length > 0">
        <v-col
          v-for="(proyecto, i) in proyectos"
          :key="i"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <cardProyecto :proyecto.sync="proyecto" v-if="i < 3" />
        </v-col>
      </v-row>

      <v-alert
        class="body-2 white--text text-center py-8"
        color="error"
        v-if="proyectos.length === 0"
      >
        No tenemos proyectos disponibles, vuelve más tarde!
      </v-alert>

      <v-card-title class="py-12">
        Revistas, ultimas novedades
        <v-spacer />
        <v-btn to="/materiales/revistas" text color="primary" rounded>
          Ver más <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-title>

      <v-row v-if="revistas.length > 0">
        <v-col
          v-for="(revista, i) in revistas"
          :key="i"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <cardRevista :revista.sync="revista" v-if="i < 3" />
        </v-col>
      </v-row>

      <v-alert
        class="body-2 white--text text-center py-8"
        color="error"
        v-if="revistas.length === 0"
      >
        Juramos que teniamos unas revistas por aqui, vuelve más tarde!
      </v-alert>

      <v-divider class="my-12" />

      <div class="title">Informaciones utiles</div>
      <v-row class="my-6" justify="center" align="stretch">
        <v-col cols="12" sm="12" md="6">
          <v-card class="pa-6" color="primary" dark>
            <v-card-title>
              <v-chip color="grey darken-3">Información</v-chip>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-card-title>
                    Revisa tus préstamos vigentes
                  </v-card-title>
                  <v-card-text>
                    Solo debes acceder a tu cuenta de usuario y podras realizar
                    las consultas relacionadas a todos los prestamos que has
                    solicitado hasta la fecha.<br /><br />
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-img
                    contain
                    src="@/assets/booking.svg"
                    class="mt-8"
                    height="200"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pt-6">
              <v-spacer />
              <v-btn rounded to="/prestamos">
                Ver mis préstamos
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-card class="pa-6" color="primary" dark>
            <v-card-title>
              <v-chip color="grey darken-3">Información</v-chip>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-card-title>
                    ¿Has olvidado devolver un libro?
                  </v-card-title>
                  <v-card-text>
                    Si has olvidado entregar un libro dentro de plazo, pueden
                    que te hayan multado para confirmarlo solo debes ingresar
                    aqui, en caso de tener que pagar solo ve a la biblioteca y
                    cancela tu multa.
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-img
                    contain
                    src="@/assets/forgot.svg"
                    class="mt-8"
                    height="200"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pt-6">
              <v-spacer />
              <v-btn rounded to="/multas">
                Ver multas vigentes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import libroStore from "@/store/libroStore";
import proyectoStore from "@/store/proyectoStore";
import revistaStore from "@/store/revistaStore";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "Home",

  components: {
    cardBook: () => import("@/components/shared/CardBook.vue"),
    cardRevista: () => import("@/components/shared/CardRevista.vue"),
    cardProyecto: () => import("@/components/shared/CardProyecto.vue")
  },

  data: () => ({
    libros: [],
    revistas: [],
    proyectos: []
  }),

  async mounted() {
    await this.$store.registerModule("libroStore", libroStore);
    await this.$store.registerModule("revistaStore", revistaStore);
    await this.$store.registerModule("proyectoStore", proyectoStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("libroStore");
    this.$store.unregisterModule("proyectoStore");
    this.$store.unregisterModule("revistaStore");
  },

  computed: {
    ...mapState("libroStore", { arrayLibros: "arrayEntity" }),
    ...mapState("revistaStore", { arrayRevistas: "arrayEntity" }),
    ...mapState("proyectoStore", { arrayProyectos: "arrayEntity" })
  },

  methods: {
    ...mapActions("libroStore", {
      libroGetAll: "getAll"
    }),
    ...mapActions("proyectoStore", {
      proyectoGetAll: "getAll"
    }),
    ...mapActions("revistaStore", {
      revistaGetAll: "getAll"
    }),
    async getAll() {
      try {
        this.loading = true;
        await this.libroGetAll();
        this.libros = await this.arrayLibros;
        await this.proyectoGetAll();
        this.proyectos = await this.arrayProyectos;
        await this.revistaGetAll();
        this.revistas = await this.arrayRevistas;
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
.background-complete {
  background-image: linear-gradient(
    180deg,
    var(--v-primary-darken1) 8%,
    var(--v-back-base) 4%,
    var(--v-back-base) 10%,
    var(--v-back-base) 15%,
    var(--v-back-base) 15%,
    var(--v-back-base) 50%
  );
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
