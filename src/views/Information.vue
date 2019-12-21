<template>
  <v-container>
    <v-card-title>Informaciones varias</v-card-title>
    <v-row class="my-6" justify="center" align="stretch">
      <v-col cols="12" sm="12" md="6">
        <v-card class="pa-6" color="info" dark to="/prestamos">
          <v-card-text class="info lighten-1 black--text">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-card-title>
                  Prestamos vigentes
                </v-card-title>
                <v-card-text>
                  Revisa los prestamos que tienes actualmente vigentes, la fecha
                  cuando los solicitaste y la fecha en que vence tu prestamo.
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-img
                  contain
                  src="@/assets/booking.svg"
                  class="mt-8"
                  height="200"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="my-6" />
          <v-card-actions class="pt-6">
            <v-spacer />
            <v-btn rounded to="/prestamos">
              Ver mis préstamos
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-card class="pa-6" color="error" dark to="/multas">
          <v-card-text class="error lighten-1 black--text">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-card-title>
                  Multas vigentes
                </v-card-title>
                <v-card-text>
                  Accede aqui a todas las multas que posees vigentes, el monto
                  total a cancelar en concepto de multa y/o motivo de ella. Solo
                  haz clic aqui.
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-img
                  contain
                  src="@/assets/forgot.svg"
                  class="mt-8"
                  height="200"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="my-6" />
          <v-card-actions class="pt-6">
            <v-spacer />
            <v-btn rounded to="/multas">
              Ver multas vigentes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-card class="pa-6" color="success" dark>
          <v-card-text class="success lighten-1 black--text">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-card-title>
                  Solicitar un material bibliográfico
                </v-card-title>
                <v-card-text>
                  ¿Quieres solicitar un material bibliográfico?, solo ingresa
                  aqui y selecciona el tipo de material bibliográfico que deseas
                  solicitar.
                  <br />
                  Los materiales bibliografícos se prestan con un plazo de
                  entrega de 7 días corridos, si necesitas aumentar tu fecha de
                  entrega solicita hablar con el encargado para solicitar su
                  extensión.
                </v-card-text>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-img
                  contain
                  src="@/assets/bookReading.svg"
                  class="mt-8"
                  height="200"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="my-6" />
          <v-card-text class="pt-6">
            <v-btn rounded to="/materiales/libros" class="ma-2">
              Solicitar un libro
            </v-btn>
            <v-btn rounded to="/materiales/proyectos" class="ma-2">
              Solicitar un proyecto
            </v-btn>
            <v-btn rounded to="/materiales/revistas" class="ma-2">
              Solicitar una revista
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "information"
};
</script>

<style></style>
