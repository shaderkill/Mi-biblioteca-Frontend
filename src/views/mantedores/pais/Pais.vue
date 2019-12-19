import bibliotecaStore from '@/store/bibliotecaStore';
<template>
  <v-container>
    <v-card-title>Paises</v-card-title>
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
import paisStore from "@/store/paisStore";
import { mapState, mapActions } from "vuex";

export default {
  name: "Pais",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/pais",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("paisStore", paisStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("paisStore");
  },

  computed: {
    ...mapState("paisStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("paisStore", {
      paisGetAll: "getAll",
      paisGetByID: "getByID",
      paisDelete: "deleteEntity",
      paisUpdate: "updateEntity",
      paisCreate: "saveEntity",
      paisClearEntity: "clearEntity"
    }),

    async getAll() {
      this.loading = true;
      await this.paisGetAll();
      this.items = this.arrayEntity;
      this.items.forEach(item => {
        for (let value in item) {
          if (typeof item[value] === "object")
            item[value] = item[value] ? item[value].nombre : null;
        }
      });
      this.getHeaders();
      this.loading = false;
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
      await this.paisDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
