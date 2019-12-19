<template>
  <v-app id="inspire" dark>
    <v-container fluid class="fill-height grey darken-2 animated slideInDown">
      <v-row>
        <v-col cols="12" sm="12">
          <v-row justify="center" align="center" class="pt-12">
            <v-icon color="primary" x-large>mdi-book-open-page-variant</v-icon>
            <span class="display-1 ml-4 mt-1 white--text">Mi biblioteca</span>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-row justify="center" align="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </v-col>
        <v-col cols="12" sm="12">
          <v-row justify="center" align="center">
            <span class="body-1 white--text">Cargando</span>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "loading",

  mounted() {
    this.validateLogin();
  },

  methods: {
    async validateLogin() {
      try {
        let item = {
          email: this.$store.state.accessEmail,
          password: this.$store.state.accessPassword
        };
        let login = await this.login(item);
        if (login === true) {
          this.$router.push("/home");
          this.$toasted.success("Bienvenido a Mi biblioteca!", {
            icon: "mdi-checkbox-marked-circle"
          });
        } else {
          this.$router.push("/login");
        }
      } catch (error) {
        this.$router.push("/login");
      }
    },
    ...mapActions(["login"])
  }
};
</script>

<style></style>
