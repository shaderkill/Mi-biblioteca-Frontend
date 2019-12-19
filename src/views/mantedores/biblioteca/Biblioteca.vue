import bibliotecaStore from '@/store/bibliotecaStore';
<template>
  <v-container>
    <v-card-title>Bibliotecas</v-card-title>
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
import bibliotecaStore from "@/store/bibliotecaStore";
import { mapState, mapActions } from "vuex";
import ciudadStore from "@/store/ciudadStore";

export default {
  name: "Biblioteca",

  components: {
    vTable: () => import("@/components/shared/Table")
  },

  data: () => ({
    headers: [],
    url: "/admin/biblioteca",
    items: [],
    loading: true
  }),

  async mounted() {
    await this.$store.registerModule("bibliotecaStore", bibliotecaStore);
    await this.$store.registerModule("ciudadStore", ciudadStore);
    await this.getAll();
  },

  beforeDestroy() {
    this.$store.unregisterModule("bibliotecaStore");
    this.$store.unregisterModule("ciudadStore");
  },

  computed: {
    ...mapState("bibliotecaStore", ["entity", "arrayEntity"])
  },

  methods: {
    ...mapActions("bibliotecaStore", {
      bibliotecaGetAll: "getAll",
      bibliotecaGetByID: "getByID",
      bibliotecaDelete: "deleteEntity",
      bibliotecaUpdate: "updateEntity",
      bibliotecaCreate: "saveEntity",
      bibliotecaClearEntity: "clearEntity"
    }),
    ...mapActions("ciudadStore", { ciudadGetAll: "getAll" }),

    async getAll() {
      this.loading = true;
      await this.bibliotecaGetAll();
      await this.ciudadGetAll();
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
      await this.bibliotecaDelete(item);
      this.items = this.arrayEntity;
    }
  }
};
</script>

<style></style>
