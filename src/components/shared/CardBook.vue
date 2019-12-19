<template>
  <v-card
    :loading="isLoading"
    outlined
    loader-height="15"
    min-height="400"
    min-width="380"
    class="animated fadeInUp"
  >
    <div
      v-if="!isLoading && !book.materialBibliografico"
      class="animated fadeIn"
    >
      <v-img src="../../assets/notIMG.png" contain />
    </div>
    <div
      v-if="!isLoading && book.materialBibliografico"
      class="animated fadeIn"
    >
      <v-img :src="book.materialBibliografico.imgBiblio" height="300" />
      <div class="pa-4">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline">{{
              book.materialBibliografico.titulo
            }}</v-list-item-title>
            <v-list-item-subtitle>por {{ book.autor }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>{{ book.materialBibliografico.descripcion }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" :to="`/materiales/libros/${book.id}`">
            más
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "cardBook",
  props: ["book"],
  data: () => ({
    isLoading: true
  }),

  mounted() {
    setTimeout(() => (this.isLoading = false), 2000);
  }
};
</script>

<style></style>
