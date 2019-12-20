<template>
  <v-card :loading="isLoading" loader-height="15" class="animated fadeInUp">
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
          <v-list-item-icon>
            <v-icon x-large>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >{{ book.materialBibliografico.titulo }}
            </v-list-item-title>
            <v-list-item-subtitle> por {{ book.autor }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-subtitle>
          <b>Categoría:</b>
          {{ book.materialBibliografico.categoria.categoria }}
        </v-card-subtitle>
        <v-card-text class="px-4" v-if="book.materialBibliografico.descripcion">
          <b>Descripción</b><br />
          {{ book.materialBibliografico.descripcion }}
        </v-card-text>
        <v-card-text
          class="px-4"
          v-if="!book.materialBibliografico.descripcion"
        >
          <b>Descripción</b><br />
          Lamentablemente no hemos encontrado una descripción apropiada.
        </v-card-text>
        <v-divider class="my-4" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn rounded color="primary" :to="`/materiales/libros/${book.id}`">
            Ver más <v-icon>mdi-chevron-right</v-icon>
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
    isLoading: true,
    window: {
      width: 0,
      height: 0
    }
  }),
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },

  mounted() {
    setTimeout(() => (this.isLoading = false), 2000);
  }
};

//:min-width="window.width < 1000 ? 410 : 415"
//:max-width="window.width < 1000 ? window.width * 0.94 : 415"
</script>

<style></style>
