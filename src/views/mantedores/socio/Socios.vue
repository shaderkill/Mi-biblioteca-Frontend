<template>
  <v-container>
    <v-card-title>Socios</v-card-title>
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
import socioStore from "@/store/socioStore";
import { mapState, mapActions } from "vuex";

export default {
  name: "socio",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/socio",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("socioStore", socioStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("socioStore");
  },

  computed: {
    ...mapState("socioStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("socioStore", {
      socioGetAll: "getAll",
      socioGetByID: "getByID",
      socioDelete: "deleteEntity",
      socioUpdate: "updateEntity",
      socioCreate: "saveEntity",
      socioClearEntity: "clearEntity"
    }),

    async getAll() {
      try {
        this.loading = true;
        await this.socioGetAll();
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
      //this.headers.push({ text: "ACCIONES", value: "actions" });
    },

    async deleteEntity(item) {
      await this.socioDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
