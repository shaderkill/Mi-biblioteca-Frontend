<template>
  <v-container>
    <v-card-title>Multas</v-card-title>
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
import multaStore from "@/store/multaStore";
import { mapState, mapActions } from "vuex";

export default {
  name: "multa",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/multa",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("multaStore", multaStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("multaStore");
  },

  computed: {
    ...mapState("multaStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("multaStore", {
      multaGetAll: "getAll",
      multaGetByID: "getByID",
      multaDelete: "deleteEntity",
      multaUpdate: "updateEntity",
      multaCreate: "saveEntity",
      multaClearEntity: "clearEntity"
    }),

    async getAll() {
      try {
        this.loading = true;
        await this.multaGetAll();
        this.items = this.arrayEntity;
        this.items.forEach(item => {
          for (let value in item) {
            if (typeof item[value] === "object")
              item[value] = item[value] ? item[value].nombre : null;
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
      await this.multaDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
