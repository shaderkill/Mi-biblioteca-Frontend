<template>
  <v-container>
    <v-card class="pa-4" :loading="isLoading">
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
                  label="Titulo"
                  :rules="textFieldRules"
                  v-model="item.titulo"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6">
                <v-select
                  filled
                  rounded
                  label="Categoria"
                  :items="listCategorias"
                  :rules="selectFieldRules"
                  v-model="item.categoria"
                />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" v-if="!item.id">
                <div class="body-1 pa-4">
                  <div>Fecha de publicación</div>
                  <v-date-picker
                    v-model="item.fechaPublicacion"
                    show-current
                    color="primary"
                    landscape
                    year-icon="mdi-calendar"
                  />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-12">
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
import materialBibliograficoStore from "@/store/materialBibliograficoStore";
import categoriaStore from "@/store/categoriaStore";

export default {
  name: "Formulario",

  data: () => ({
    item: null,
    defaultItem: {
      id: null,
      titulo: "",
      categoria: {},
      fechaPublicacion: null,
      imgBiblio: ""
    },
    imgBiblio: [],
    listCategorias: [],
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
    ...mapActions("materialBibliograficoStore", {
      materialBibliograficoGetByID: "getByID",
      materialBibliograficoUpdate: "updateEntity",
      materialBibliograficoCreate: "saveEntity",
      materialBibliograficoIMG: "uploadImg"
    }),
    ...mapActions("categoriaStore", { categoriasGetAll: "getAll" }),
    goBack() {
      this.$router.go(-1);
    },
    async sendItem() {
      for (let key in this.item) {
        if (
          !this.item[key] &&
          key !== "id" &&
          key !== "idMaterial" &&
          key !== "imgBiblio"
        )
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      if (this.item) await this.materialBibliograficoCreate(this.item);
      this.$router.go(-1);
    },
    async updateItem() {
      for (let key in this.item) {
        if (!this.item[key] && key !== "id" && key !== "idMaterial")
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.materialBibliograficoUpdate(this.item);
      this.$router.go(-1);
    },
    async updateIMG() {
      // eslint-disable-next-line no-console
      console.log(this.imgBiblio);
      if (this.imgBiblio) {
        if (this.imgBiblio.size > 20000)
          return this.$toasted.error(
            "El archivo adjunto supera los 2MB de tamaño."
          );
        if (
          this.imgBiblio === "image/jpeg" ||
          this.imgBiblio === "image/png" ||
          this.imgBiblio === "image/bmp"
        ) {
          let item = {
            img: this.imgBiblio,
            id: this.item.id
          };
          let result = await this.materialBibliograficoIMG(item);
          this.item.imgBiblio = result.data;
        } else
          return this.$toasted.error(
            "El archivo adjunto no es una imagen de formato compatible."
          );
      }
    }
  },

  computed: {
    ...mapState("materialBibliograficoStore", ["entity"]),
    ...mapState("categoriaStore", { categorias: "arrayEntity" })
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule(
        "materialBibliograficoStore",
        materialBibliograficoStore
      );
      await this.$store.registerModule("categoriaStore", categoriaStore);
      let id = this.$route.params.id;
      if (id) {
        await this.materialBibliograficoGetByID(id);
        this.item = this.entity;
        if (!this.item.imgBiblio)
          this.item.imgBiblio =
            "https://semantic-ui.com/images/wireframe/white-image.png";
      } else this.item = this.defaultItem;
      await this.categoriasGetAll();
      await this.categorias.forEach(element => {
        this.listCategorias.push({
          text: element.categoria,
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
    this.$store.unregisterModule("materialBibliograficoStore");
    this.$store.unregisterModule("categoriaStore");
  }
};
</script>

<style></style>
