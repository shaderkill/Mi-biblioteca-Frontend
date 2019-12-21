<template>
  <v-container>
    <v-card-title>Estados Multa</v-card-title>
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
import estadoMultaStore from "@/store/estadoMultaStore";
import { mapState, mapActions } from "vuex";

export default {
  name: "estadoMulta",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/estadoMulta",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("estadoMultaStore", estadoMultaStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("estadoMultaStore");
  },

  computed: {
    ...mapState("estadoMultaStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("estadoMultaStore", {
      estadoMultaGetAll: "getAll",
      estadoMultaGetByID: "getByID",
      estadoMultaDelete: "deleteEntity",
      estadoMultaUpdate: "updateEntity",
      estadoMultaCreate: "saveEntity",
      estadoMultaClearEntity: "clearEntity"
    }),

    async getAll() {
      try {
        this.loading = true;
        await this.estadoMultaGetAll();
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
      await this.estadoMultaDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
