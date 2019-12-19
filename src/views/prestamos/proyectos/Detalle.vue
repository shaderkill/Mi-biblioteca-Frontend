<template>
  <v-container>
    <v-card :loading="isLoading" loader-height="15" class="pa-4" v-if="item">
      <v-row>
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
            <v-img :src="item.materialBibliografico.imgBiblio" height="300" />
          </div>
        </v-col>
        <v-col>
          <div class="pa-4">
            <v-card-title>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    {{ item.materialBibliografico.titulo }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    por {{ item.autor }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>
            <v-card-text>
              {{ item.materialBibliografico.descripcion }}
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn rounded text color="primary" @click="solicitarproyecto">
                Solicitar el proyecto
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
import proyectoStore from "@/store/proyectoStore";

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
    ...mapActions("proyectoStore", {
      proyectoGetByID: "getByID",
      proyectoUpdate: "updateEntity",
      proyectoCreate: "saveEntity"
    }),
    solicitarproyecto() {
      return null;
    },
    goBack() {
      this.$router.go(-1);
    }
  },

  computed: {
    ...mapState("proyectoStore", ["entity"])
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("proyectoStore", proyectoStore);
      let id = this.$route.params.id;
      if (id) {
        await this.proyectoGetByID(id);
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
    this.$store.unregisterModule("proyectoStore");
  }
};
</script>

<style></style>
