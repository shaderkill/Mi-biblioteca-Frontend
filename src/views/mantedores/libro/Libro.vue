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
import libroStore from "@/store/libroStore";
import { mapState, mapActions } from "vuex";

export default {
  name: "Libro",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/libro",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("libroStore", libroStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("libroStore");
  },

  computed: {
    ...mapState("libroStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("libroStore", {
      libroGetAll: "getAll",
      libroGetByID: "getByID",
      libroDelete: "deleteEntity",
      libroUpdate: "updateEntity",
      libroCreate: "saveEntity",
      libroClearEntity: "clearEntity"
    }),

    async getAll() {
      try {
        this.loading = true;
        await this.libroGetAll();
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
      await this.libroDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
