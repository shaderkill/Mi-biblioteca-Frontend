<template>
  <v-container>
    <v-card class="px-4 pb-4" :loading="isLoading">
      <div v-if="item">
        <v-card-title>{{
          item.id ? "Actualizando una revista" : "Ingresando una nueva revista"
        }}</v-card-title>
        <v-form>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-select
                  filled
                  rounded
                  label="Material Bibliográfico"
                  :items="listmaterialBibliograficos"
                  :rules="selectFieldRules"
                  v-model="item.materialBibliografico"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-text-field
                  filled
                  rounded
                  label="Proveedor"
                  :rules="textFieldRules"
                  v-model="item.proveedor"
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
import revistaStore from "@/store/revistaStore";
import materialBibliograficoStore from "@/store/materialBibliograficoStore";

export default {
  name: "Formulario",

  data: () => ({
    item: null,
    defaultItem: {
      id: null,
      proveedor: "",
      materialBibliografico: {}
    },
    listmaterialBibliograficos: [],
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
    ...mapActions("revistaStore", {
      revistaGetByID: "getByID",
      revistaUpdate: "updateEntity",
      revistaCreate: "saveEntity"
    }),
    ...mapActions("materialBibliograficoStore", {
      materialBibliograficosGetAll: "getAll"
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
      await this.revistaCreate(this.item);
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
      await this.revistaUpdate(this.item);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    }
  },

  computed: {
    ...mapState("revistaStore", ["entity"]),
    ...mapState("materialBibliograficoStore", {
      materialBibliograficos: "arrayEntity"
    })
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("revistaStore", revistaStore);
      await this.$store.registerModule(
        "materialBibliograficoStore",
        materialBibliograficoStore
      );
      let id = this.$route.params.id;
      if (id) {
        await this.revistaGetByID(id);
        this.item = this.entity;
      } else this.item = this.defaultItem;
      await this.materialBibliograficosGetAll();
      await this.materialBibliograficos.forEach(element => {
        this.listmaterialBibliograficos.push({
          text: element.titulo,
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
    this.$store.unregisterModule("revistaStore");
    this.$store.unregisterModule("materialBibliograficoStore");
  }
};
</script>

<style></style>
