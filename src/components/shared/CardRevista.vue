<template>
  <v-card :loading="isLoading" loader-height="15" class="animated fadeInUp">
    <div
      v-if="!isLoading && !revista.materialBibliografico"
      class="animated fadeIn"
    >
      <v-img src="../../assets/notIMG.png" contain />
    </div>
    <div
      v-if="!isLoading && revista.materialBibliografico"
      class="animated fadeIn"
    >
      <v-img :src="revista.materialBibliografico.imgBiblio" height="300" />
      <div class="pa-4">
        <v-list-item>
          <v-list-item-icon>
            <v-icon x-large>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >{{ revista.materialBibliografico.titulo }}
            </v-list-item-title>
            <v-list-item-subtitle>
              de {{ revista.proveedor }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-subtitle>
          <b>Categoría:</b>
          {{ revista.materialBibliografico.categoria.categoria }}
        </v-card-subtitle>
        <v-card-text
          class="px-4"
          v-if="revista.materialBibliografico.descripcion"
        >
          <b>Descripción</b><br />
          {{
            revista.materialBibliografico.descripcion.substring(0, 200) + "..."
          }}
        </v-card-text>
        <v-card-text
          class="px-4"
          v-if="!revista.materialBibliografico.descripcion"
        >
          <b>Descripción</b><br />
          Lamentablemente no hemos encontrado una descripción apropiada.
        </v-card-text>
        <v-divider class="my-4" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="primary"
            :to="`/materiales/revistas/${revista.id}`"
          >
            Ver más
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "cardrevista",
  props: ["revista"],
  data: () => ({
    isLoading: true
  }),

  mounted() {
    setTimeout(() => (this.isLoading = false), 2000);
  }
};
</script>

<style></style>
