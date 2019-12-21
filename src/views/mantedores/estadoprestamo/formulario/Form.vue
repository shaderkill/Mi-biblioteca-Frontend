<template>
  <v-container>
    <v-card class="px-4 pb-4" :loading="isLoading">
      <div v-if="item">
        <v-card-title>{{
          item.id
            ? "Actualizando un estado de prestamo"
            : "Ingresando un nuevo estado de prestamo"
        }}</v-card-title>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                  filled
                  rounded
                  label="Nombre"
                  :rules="textFieldRules"
                  v-model="item.estado"
                />
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
import estadoPrestamoStore from "@/store/estadoPrestamoStore";
export default {
  name: "Formulario",

  data: () => ({
    item: null,
    defaultItem: {
      id: null,
      estado: ""
    },
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
    ...mapActions("estadoPrestamoStore", {
      estadoPrestamoGetByID: "getByID",
      estadoPrestamoUpdate: "updateEntity",
      estadoPrestamoCreate: "saveEntity"
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
      await this.estadoPrestamoCreate(this.item);
      setTimeout(() => {
        this.$router.push("/admin/estadoPrestamo");
      }, 3000);
    },
    async updateItem() {
      for (let key in this.item) {
        if (!this.item[key] && key !== "id")
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.estadoPrestamoUpdate(this.item);
      setTimeout(() => {
        this.$router.push("/admin/estadoPrestamo");
      }, 3000);
    }
  },

  computed: {
    ...mapState("estadoPrestamoStore", ["entity"])
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule(
        "estadoPrestamoStore",
        estadoPrestamoStore
      );
      let id = this.$route.params.id;
      if (id) {
        await this.estadoPrestamoGetByID(id);
        this.item = this.entity;
      } else this.item = this.defaultItem;
    } catch (error) {
      this.$toasted.error("No han podido ser cargado los datos necesarios.", {
        icon: "mdi-alert"
      });
    } finally {
      this.isLoading = false;
    }
  },

  beforeDestroy() {
    this.$store.unregisterModule("estadoPrestamoStore");
  }
};
</script>

<style></style>
