<template>
  <v-container class="py-12 mb-12">
    <v-card :loading="isLoading" loader-height="15" class="pa-4" v-if="item">
      <v-row class="pb-12">
        <v-btn text color="error" @click="goBack">
          <v-icon class="mr-1">mdi-arrow-left</v-icon> Volver
        </v-btn>
      </v-row>
      <v-row>
        <v-col>
          <div
            v-if="!isLoading && !item.materialBibliografico"
            class="animated fadeIn"
          >
            <v-img src="@/assets/notIMG.png" contain />
          </div>
          <div
            v-if="!isLoading && item.materialBibliografico"
            class="animated fadeIn"
          >
            <v-img :src="item.materialBibliografico.imgBiblio" contain />
          </div>
        </v-col>
        <v-col>
          <div class="pa-4">
            <v-list-item>
              <v-list-item-icon>
                <v-icon x-large>mdi-bookmark</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="headline"
                  >{{ item.materialBibliografico.titulo }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  de {{ item.proveedor }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-subtitle>
              <b>Categoría:</b>
              {{ item.materialBibliografico.categoria.categoria }}
            </v-card-subtitle>
            <v-card-text
              class="px-4"
              v-if="item.materialBibliografico.descripcion"
            >
              <b>Descripción</b><br />
              {{ item.materialBibliografico.descripcion }}
            </v-card-text>
            <v-card-text
              class="px-4"
              v-if="!item.materialBibliografico.descripcion"
            >
              <b>Descripción</b><br />
              Lamentablemente no hemos encontrado una descripción apropiada.
            </v-card-text>
            <v-card-text>
              Los prestamos son validos solo por 7 días.
            </v-card-text>
            <v-card-actions>
              <v-btn
                rounded
                absolute
                bottom
                right
                color="primary"
                class="mb-6"
                @click="solicitar"
              >
                Solicitar la revista
              </v-btn>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import revistaStore from "@/store/revistaStore";
let global = require("@/global/js/crud.js");

export default {
  name: "Detalle",

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
    ...mapActions("revistaStore", {
      revistaGetByID: "getByID",
      revistaUpdate: "updateEntity",
      revistaCreate: "saveEntity"
    }),
    solicitarrevista() {
      return null;
    },
    goBack() {
      this.$router.go(-1);
    },
    async solicitar() {
      let id = this.$store.state.accessID;
      await global.solicitar({
        entity: "prestamos",
        idUser: id,
        idBook: this.item.materialBibliografico.id
      });
    }
  },

  computed: {
    ...mapState("revistaStore", ["entity"])
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("revistaStore", revistaStore);
      let id = this.$route.params.id;
      if (id) {
        await this.revistaGetByID(id);
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
    this.$store.unregisterModule("revistaStore");
  }
};
</script>

<style></style>
