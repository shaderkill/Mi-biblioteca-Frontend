<template>
  <v-container>
    <v-card class="px-4 pb-4" :loading="isLoading">
      <div v-if="item">
        <v-card-title>{{
          item.id
            ? "Actualizando un Material Bibliográfico"
            : "Ingresando un nuevo Material Bibliográfico"
        }}</v-card-title>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                  filled
                  rounded
                  label="Categoria"
                  :rules="textFieldRules"
                  v-model="item.categoria"
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
import categoriaStore from "@/store/categoriaStore";
export default {
  name: "Formulario",

  data: () => ({
    item: null,
    defaultItem: {
      id: null,
      categoria: ""
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
    ...mapActions("categoriaStore", {
      categoriaGetByID: "getByID",
      categoriaUpdate: "updateEntity",
      categoriaCreate: "saveEntity"
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
      await this.categoriaCreate(this.item);
      setTimeout(() => {
        this.$router.push("/admin/categoria");
      }, 1000);
    },
    async updateItem() {
      for (let key in this.item) {
        if (!this.item[key] && key !== "id" && key !== "idMaterial")
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.categoriaUpdate(this.item);
      setTimeout(() => {
        this.$router.push("/admin/categoria");
      }, 1000);
    }
  },

  computed: {
    ...mapState("categoriaStore", ["entity"])
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("categoriaStore", categoriaStore);
      let id = this.$route.params.id;
      if (id) {
        await this.categoriaGetByID(id);
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
    this.$store.unregisterModule("categoriaStore");
  }
};
</script>

<style></style>
