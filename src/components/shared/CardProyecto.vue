<template>
  <v-card
    :loading="isLoading"
    loader-height="15"
    min-height="400"
    min-width="380"
    class="animated fadeInUp"
  >
    <div
      v-if="!isLoading && !proyecto.materialBibliografico"
      class="animated fadeIn"
    >
      <v-img src="../../assets/notIMG.png" contain />
    </div>
    <div
      v-if="!isLoading && proyecto.materialBibliografico"
      class="animated fadeIn"
    >
      <v-img :src="proyecto.materialBibliografico.imgBiblio" height="300" />
      <div class="pa-4">
        <v-list-item>
          <v-list-item-icon>
            <v-icon x-large>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >{{ proyecto.materialBibliografico.titulo }}
            </v-list-item-title>
            <v-list-item-subtitle>
              por {{ proyecto.autor }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-subtitle>
          <b>Categoría:</b>
          {{ proyecto.materialBibliografico.categoria.categoria }}
        </v-card-subtitle>
        <v-card-text
          class="px-4"
          v-if="proyecto.materialBibliografico.descripcion"
        >
          <b>Descripción</b><br />
          {{ proyecto.materialBibliografico.descripcion }}
        </v-card-text>
        <v-card-text
          class="px-4"
          v-if="!proyecto.materialBibliografico.descripcion"
        >
          <b>Descripción</b><br />
          Lamentablemente no hemos encontrado una descripción apropiada.
        </v-card-text>
        <v-divider class="my-4" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            outlined
            color="primary"
            :to="`/materiales/proyectos/${proyecto.id}`"
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
  name: "cardproyecto",
  props: ["proyecto"],
  data: () => ({
    isLoading: true
  }),

  mounted() {
    setTimeout(() => (this.isLoading = false), 2000);
  }
};
</script>

<style></style>
