<template>
  <v-card
    :loading="isLoading"
    loader-height="15"
    :color="item.fechaVencimiento > new Date() ? 'error' : 'success'"
    dark
    class="animated fadeInUp"
  >
    <div
      v-if="!isLoading && item.materialBibliografico"
      class="animated fadeIn"
    >
      <div class="pa-4">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title"
              >{{ item.materialBibliografico.titulo }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-subtitle>
          <b>Categoría:</b>
          {{ item.materialBibliografico.categoria.categoria }}
        </v-card-subtitle>
        <v-card-text class="px-4">
          <b>Fecha de solicitud: </b> {{ item.fechaPrestamo | formatDate
          }}<br />
          <b>Fecha de vencimiento: </b> {{ item.fechaVencimiento | formatDate }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "card",
  props: ["item"],
  data: () => ({
    isLoading: true
  }),

  mounted() {
    setTimeout(() => (this.isLoading = false), 2000);
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
