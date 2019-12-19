<template>
  <v-container>
    <v-card-title>Materiales Bibliográficos</v-card-title>
    <vTable
      :headers.sync="headers"
      :items.sync="items"
      :isLoading.sync="loading"
      :urlBase.sync="url"
      @updateTable="getAll"
      @deleteEntity="deleteEntity"
    />
  </v-container>
</template>

<script>
import proyectoStore from "@/store/proyectoStore";
import { mapState, mapActions } from "vuex";

export default {
  name: "proyecto",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/proyecto",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("proyectoStore", proyectoStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("proyectoStore");
  },

  computed: {
    ...mapState("proyectoStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("proyectoStore", {
      proyectoGetAll: "getAll",
      proyectoGetByID: "getByID",
      proyectoDelete: "deleteEntity",
      proyectoUpdate: "updateEntity",
      proyectoCreate: "saveEntity",
      proyectoClearEntity: "clearEntity"
    }),

    async getAll() {
      try {
        this.loading = true;
        await this.proyectoGetAll();
        this.items = this.arrayEntity;
        this.items.forEach(item => {
          for (let value in item) {
            if (typeof item[value] === "object")
              item[value] = item[value] ? item[value].titulo : null;
          }
        });
        this.getHeaders();
      } catch (error) {
        this.$toasted.error(
          "No se han logrado obtener datos desde el servidor.",
          { icon: "mdi-alert " }
        );
      } finally {
        this.loading = false;
      }
    },

    getHeaders() {
      this.headers = [];
      let keys = Object.keys(this.items.length > 0 ? this.items[0] : null);
      keys
        ? keys.forEach(key => {
            this.headers.push({ text: key.toUpperCase(), value: key });
          })
        : null;
      this.headers.push({ text: "ACCIONES", value: "actions" });
    },

    async deleteEntity(item) {
      await this.proyectoDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
