<template>
  <v-container>
    <v-card class="px-4 pb-4" :loading="isLoading">
      <div v-if="item">
        <v-card-title>{{
          item.id ? "Actualizando la ciudad" : "Creando una nueva ciudad"
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
                  v-model="item.nombre"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-select
                  filled
                  rounded
                  label="Pais"
                  :items="listPaises"
                  :rules="selectFieldRules"
                  v-model="item.pais"
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
import paisStore from "@/store/paisStore";
import ciudadStore from "@/store/ciudadStore";
export default {
  name: "Formulario",

  data: () => ({
    item: null,
    defaultItem: {
      id: null,
      nombre: "",
      pais: ""
    },
    isLoading: true,
    listPaises: [],
    textFieldRules: [v => !!v || "Debe ingresar el valor solicitado."],
    selectFieldRules: [v => !!v || "Debe seleccionar el valor solicitado."],
    textFieldRulesWithMin: [
      v => !!v || "Debe ingresar el valor solicitado.",
      v =>
        v.length > 8 || "El valor solicitado debe ser de al menos 8 caracteres."
    ]
  }),

  methods: {
    ...mapActions("ciudadStore", {
      ciudadGetByID: "getByID",
      ciudadUpdate: "updateEntity",
      ciudadCreate: "saveEntity"
    }),
    ...mapActions("ciudadStore", { ciudadesGetAll: "getAll" }),
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
      await this.ciudadCreate(this.item);
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
      await this.ciudadUpdate(this.item);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    }
  },

  computed: {
    ...mapState("paisStore", { paises: "arrayEntity" }),
    ...mapState("ciudadStore", ["entity"])
  },

  async mounted() {
    this.isLoading = true;
    await this.$store.registerModule("paisStore", paisStore);
    await this.$store.registerModule("ciudadStore", ciudadStore);
    let id = this.$route.params.id;
    if (id) {
      await this.ciudadGetByID(id);
      this.item = this.entity;
    } else this.item = this.defaultItem;
    this.listPaises = [];
    await this.ciudadesGetAll();
    await this.paises.forEach(element => {
      this.listPaises.push({
        text: element.nombre,
        value: element
      });
    });
    this.isLoading = false;
  },

  beforeDestroy() {
    this.$store.unregisterModule("paisStore");
    this.$store.unregisterModule("ciudadStore");
  }
};
</script>

<style></style>
