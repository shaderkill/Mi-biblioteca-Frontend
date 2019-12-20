<template>
  <v-card
    :loading="isLoading"
    loader-height="15"
    color="error"
    dark
    class="animated fadeInUp"
  >
    <div v-if="!isLoading && item.prestamo" class="animated fadeIn">
      <div class="pa-4">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="title"
              >{{ item.prestamo.materialBibliografico.titulo }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-subtitle>
          <b>Categoría:</b>
          {{ item.prestamo.materialBibliografico.categoria.categoria }}
        </v-card-subtitle>
        <v-card-text class="px-4">
          <b>Fecha de solicitud: </b>
          {{ item.prestamo.fechaPrestamo | formatDate }}<br />
          <b>Fecha de vencimiento: </b>
          {{ item.prestamo.fechaVencimiento | formatDate }}
        </v-card-text>
        <v-card-subtitle>
          <b>Detalles de la multa:</b>
        </v-card-subtitle>
        <v-card-text class="px-4">
          <b>Monto $: </b>
          {{ item.monto }}
          <b>Estado: </b>
          {{ item.estadoMulta.estado }}
          <b v-if="item.fechaCancelacion">Cancelado el: </b>
          {{ item.fechaCancelacion | formatDate }}
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
