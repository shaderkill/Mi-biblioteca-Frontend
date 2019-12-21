<template>
  <v-container>
    <v-card class="px-4 pb-4" :loading="isLoading">
      <div v-if="item">
        <v-card-title>{{
          item.id ? "Actualizando una Multa" : "Ingresando una nueva Multa"
        }}</v-card-title>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                  filled
                  rounded
                  label="Monto"
                  :rules="textFieldRules"
                  v-model="item.monto"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-select
                  filled
                  rounded
                  label="Estado Multa"
                  :items="estadoMultas"
                  :rules="selectFieldRules"
                  v-model="item.ciudad"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <div class="body-1 pa-4">
                  <div>Fecha de cancelación</div>
                  <v-date-picker
                    v-model="item.fechaCancelacion"
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
import multaStore from "@/store/multaStore";
import estadoMultaStore from "@/store/estadoMultaStore";
export default {
  name: "Formulario",

  data: () => ({
    item: null,
    defaultItem: {
      id: null,
      prestamo: {},
      monto: 0,
      estadoMulta: {},
      fechaCancelacion: null
    },
    estadoMultas: [],
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
    ...mapActions("multaStore", {
      multaGetByID: "getByID",
      multaUpdate: "updateEntity",
      multaCreate: "saveEntity"
    }),
    ...mapActions("estadoMultaStore", {
      estadoMultaGetAll: "getAll"
    }),
    goBack() {
      this.$router.go(-1);
    },
    async sendItem() {
      for (let key in this.item) {
        if (!this.item[key] && key !== "id" && key !== "idMaterial")
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.multaCreate(this.item);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },
    async updateItem() {
      for (let key in this.item) {
        if (!this.item[key] && key !== "id" && key !== "idMaterial")
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.multaUpdate(this.item);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    }
  },

  computed: {
    ...mapState("multaStore", ["entity"]),
    ...mapState("estadoMultaStore", { arrayMultas: "arrayEntity" })
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("multaStore", multaStore);
      await this.$store.registerModule("estadoMultaStore", estadoMultaStore);
      await this.estadoMultaGetAll();
      let id = this.$route.params.id;
      if (id) {
        await this.multaGetByID(id);
        this.item = this.entity;
        this.item.fechaCancelacion = this.item.fechaCancelacion
          ? this.item.fechaCancelacion.substring(0, 10)
          : null;
      } else this.item = this.defaultItem;
      await this.arrayMultas.forEach(element => {
        this.estadoMultas.push({
          text: element.estado,
          value: element
        });
      });
    } catch (error) {
      this.$toasted.error("No han podido ser cargado los datos necesarios.", {
        icon: "mdi-alert"
      });
    } finally {
      this.isLoading = false;
    }
  },

  beforeDestroy() {
    this.$store.unregisterModule("multaStore");
    this.$store.unregisterModule("estadoMultaStore");
  }
};
</script>

<style></style>
