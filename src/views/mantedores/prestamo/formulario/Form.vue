<template>
  <v-container>
    <v-card class="px-4 pb-4" :loading="isLoading">
      <div v-if="item">
        <v-card-title>{{
          item.id ? "Actualizando un prestamo" : "Ingresando un nuevo prestamo"
        }}</v-card-title>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <div class="body-1 pa-4">
                  <div>Fecha de prestamo</div>
                  <v-date-picker
                    v-model="item.fechaPrestamo"
                    show-current
                    color="primary"
                    landscape
                    year-icon="mdi-calendar"
                  />
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <div class="body-1 pa-4">
                  <div>Fecha de vencimiento</div>
                  <v-date-picker
                    v-model="item.fechaVencimiento"
                    show-current
                    color="primary"
                    landscape
                    year-icon="mdi-calendar"
                  />
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <div class="body-1 pa-4">
                  <div>Fecha de entrega</div>
                  <v-date-picker
                    v-model="item.fechaEntrega"
                    show-current
                    color="primary"
                    landscape
                    year-icon="mdi-calendar"
                  />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn rounded color="error" large @click="goBack">
              <v-icon class="mr-1">mdi-arrow-left</v-icon>Volver
            </v-btn>
            <v-btn
              rounded
              color="success"
              large
              @click="item.id ? updateItem() : sendItem()"
            >
              <v-icon class="mr-1">mdi-plus</v-icon>
              {{ item.id ? "Actualizar" : "Enviar" }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import prestamoStore from "@/store/prestamoStore";

export default {
  name: "Formulario",

  data: () => ({
    item: null,
    isLoading: true,
    textFieldRules: [v => !!v || "Debe ingresar el valor solicitado."],
    selectFieldRules: [v => !!v || "Debe seleccionar el valor solicitado."],
    textFieldRulesWithMin: [
      v => !!v || "Debe ingresar el valor solicitado.",
      v =>
        v.length > 8 || "El valor solicitado debe ser de al menos 8 caracteres."
    ]
  }),

  methods: {
    ...mapActions("prestamoStore", {
      prestamoGetByID: "getByID",
      prestamoUpdate: "updateEntity",
      prestamoCreate: "saveEntity"
    }),
    goBack() {
      this.$router.go(-1);
    },
    async sendItem() {
      for (let key in this.item) {
        if (
          !this.item[key] &&
          key !== "id" &&
          key !== "prestamo" &&
          key !== "fechaEntrega"
        )
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.prestamoCreate(this.item);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },
    async updateItem() {
      for (let key in this.item) {
        if (
          !this.item[key] &&
          key !== "id" &&
          key !== "prestamo" &&
          key !== "fechaEntrega"
        )
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.prestamoUpdate(this.item);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    }
  },

  computed: {
    ...mapState("prestamoStore", ["entity"])
  },

  async beforeMount() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("prestamoStore", prestamoStore);
      let id = this.$route.params.id;
      if (id) {
        await this.prestamoGetByID(id);
        this.item = this.entity;
        this.item.fechaEntrega = this.item.fechaEntrega
          ? this.item.fechaEntrega.substring(0, 10)
          : null;
        this.item.fechaPrestamo = this.item.fechaPrestamo
          ? this.item.fechaPrestamo.substring(0, 10)
          : null;
        this.item.fechaVencimiento = this.item.fechaVencimiento
          ? this.item.fechaVencimiento.substring(0, 10)
          : null;
      }
    } catch (error) {
      this.$toasted.error("No han podido ser cargado los datos necesarios.", {
        icon: "mdi-alert"
      });
    } finally {
      this.isLoading = false;
    }
  },

  beforeDestroy() {
    this.$store.unregisterModule("prestamoStore");
  }
};
</script>

<style></style>
