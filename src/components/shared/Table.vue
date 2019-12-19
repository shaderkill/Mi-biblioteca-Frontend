<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="15"
      class="elevation-2"
      :search="search"
      :loading="isLoading"
      multi-sort
      fixed-header
    >
      <template v-slot:top>
        <v-toolbar class="elevation-1" tile color="primary" dark extended>
          <v-toolbar-items>
            <v-text-field
              v-model="search"
              class="mt-3"
              background-color="primary darken-1"
              filled
              rounded
              prepend-inner-icon="mdi-magnify"
              label="Buscar"
              clearable
            />
          </v-toolbar-items>
          <v-spacer />
          <v-tooltip bottom color="secondary">
            <template v-slot:activator="{ on }">
              <v-btn
                rounded
                color="primary darken-1"
                depressed
                class="mx-1"
                v-on="on"
                @click="createDialog"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Agregar</span>
          </v-tooltip>
          <v-tooltip bottom color="secondary">
            <template v-slot:activator="{ on }">
              <v-btn
                rounded
                class="mx-1"
                v-on="on"
                color="primary darken-1"
                depressed
                @click="updateTable"
              >
                <v-icon>mdi-autorenew</v-icon>
              </v-btn>
            </template>
            <span>Actualizar</span>
          </v-tooltip>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom color="secondary">
          <template v-slot:activator="{ on }">
            <v-icon
              large
              class="mr-2"
              @click="editItem(item)"
              v-on="on"
              color="info"
              >mdi-pencil-circle</v-icon
            >
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom color="secondary">
          <template v-slot:activator="{ on }">
            <v-icon large @click="deleteItem(item)" v-on="on" color="error"
              >mdi-delete-circle</v-icon
            >
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </template>

      <template v-slot:item.fechaPublicacion="{ item }">
        <span>{{ item.fechaPublicacion | formatDate }}</span>
      </template>

      <template v-slot:item.imgBiblio="{ item }">
        <v-card
          class="pa-1 ma-1"
          color="#22222222"
          width="100"
          @click="editIMG(item)"
        >
          <v-img :src="item.imgBiblio" contain height="100" width="100" />
        </v-card>
      </template>

      <template v-slot:no-data>
        <v-row justify="center" align="center">
          <span class="display-1 pa-12"
            >No se encontraron datos en el servidor.</span
          >
          <v-img
            src="../../assets/notFound.svg"
            contain
            transition="scale-transition"
            height="300"
          />
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Table",
  props: ["headers", "items", "isLoading", "urlBase"],
  data: () => ({
    search: "",
    dataHead: [],
    dataBody: []
  }),
  methods: {
    createDialog() {
      this.$router.push(`${this.urlBase}/form`);
    },
    updateTable() {
      this.$emit("updateTable");
    },
    editItem(item) {
      this.$router.push(`${this.urlBase}/form/${item.id}`);
    },
    editIMG(item) {
      this.$router.push(`${this.urlBase}/img/${item.id}`);
    },
    deleteItem(item) {
      this.$emit("deleteEntity", item);
    }
  },

  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("DD-MM-YYYY");
      }
    }
  }
};
</script>

<style></style>
