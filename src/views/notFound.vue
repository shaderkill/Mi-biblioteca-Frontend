<template>
  <v-container>
    <v-card class="pa-6">
      <v-card-title class="justify-center">
        La pagina que has solicitado la hemos perdido... ¿No prefieres volver al
        inicio?
      </v-card-title>
      <v-card-text>
        <v-img src="../assets/notFound.svg" contain height="400" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn rounded x-large color="primary" to="/home">
          Volver al inicio
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style></style>
