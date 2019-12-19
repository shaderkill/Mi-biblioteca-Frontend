<template>
  <v-container>
    <v-card class="pb-4" :loading="isLoading">
      <div v-if="item">
        <v-tabs
          v-model="tab"
          fixed-tabs
          hide-slider
          background-color="secondary"
          dark
          active-class="secondary darken-2"
        >
          <v-tab>Modificar avatar</v-tab>
          <v-tab>Modificar mis datos</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item class="mx-4">
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="6" lg="6" v-if="item.id">
                  <v-row align="center" justify="center">
                    <v-avatar
                      class="pa-1 align-center"
                      color="#22222222"
                      height="400"
                      width="400"
                      ripple
                    >
                      <v-img :src="item.imgAvatar" />
                    </v-avatar>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="6" v-if="item.id">
                  <v-file-input
                    :rules="[
                      v =>
                        v.size < 2000000 ||
                        'La imagen debe pesar menos de 2 MB!'
                    ]"
                    v-model="img"
                    accept="image/png, image/jpeg, image/bmp, image/jpg"
                    placeholder="Selecciona tu avatar"
                    prepend-inner-icon="mdi-camera"
                    label="Avatar"
                    rounded
                    filled
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn rounded color="primary" large @click="updateIMG">
                Subir imagen
              </v-btn>
            </v-card-actions>
          </v-tab-item>
          <v-tab-item>
            <v-form lazy-validation>
              <v-stepper
                v-model="element"
                vertical
                class="elevation-0"
                non-linear
              >
                <v-stepper-step :complete="element > 1" step="1" editable
                  >Ingresa tus datos</v-stepper-step
                >
                <v-stepper-content step="1">
                  <v-text-field
                    rounded
                    filled
                    :rules="[v => !!v || 'Debe ingresar su nombre']"
                    label="Nombre"
                    type="text"
                    v-model="item.persona.nombre"
                  />
                  <v-text-field
                    rounded
                    filled
                    :rules="[v => !!v || 'Debe ingresar su apellido paterno']"
                    label="Apellido Paterno"
                    type="text"
                    v-model="item.persona.apellidoPaterno"
                  />
                  <v-text-field
                    rounded
                    filled
                    :rules="[v => !!v || 'Debe ingresar su apellido materno']"
                    label="Apellido Materno"
                    type="text"
                    v-model="item.persona.apellidoMaterno"
                  />
                  <v-text-field
                    rounded
                    filled
                    :rules="[v => !!v || 'Debe ingresar su RUT']"
                    label="RUT"
                    type="text"
                    v-model="item.persona.rut"
                  />
                  <v-row justify="end" no-gutters>
                    <v-btn
                      depressed
                      fab
                      small
                      color="primary"
                      @click="++element"
                    >
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-row>
                </v-stepper-content>

                <v-stepper-step :complete="element > 2" editable step="2"
                  >Ingresa tus datos de usuario</v-stepper-step
                >

                <v-stepper-content step="2">
                  <v-text-field
                    rounded
                    filled
                    :rules="emailRules"
                    label="E-mail"
                    type="text"
                    v-model="item.email"
                  />
                  <v-text-field
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    rounded
                    filled
                    :rules="passwordRules"
                    label="Contraseña"
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="item.password"
                  />
                  <v-row justify="end" no-gutters>
                    <v-btn
                      depressed
                      fab
                      small
                      color="primary"
                      @click="--element"
                    >
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      depressed
                      fab
                      small
                      color="primary"
                      @click="++element"
                    >
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-row>
                </v-stepper-content>

                <v-stepper-step :complete="element > 3" editable step="3"
                  >Selecciona tu biblioteca</v-stepper-step
                >

                <v-stepper-content step="3">
                  <v-select
                    filled
                    rounded
                    :items="bibliotecas"
                    v-model="item.biblioteca"
                    label="Biblioteca preferida"
                    :rules="[v => !!v || 'Debe seleccionar una biblioteca']"
                  />
                  <v-row>
                    <v-spacer />
                    <v-btn rounded color="error" large @click="goBack">
                      <v-icon class="mr-1">mdi-arrow-left</v-icon>Volver
                    </v-btn>
                    <v-btn rounded color="success" large @click="updateItem">
                      <v-icon class="mr-1">mdi-plus</v-icon>
                      Actualizar mis datos
                    </v-btn>
                  </v-row>
                </v-stepper-content>
              </v-stepper>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import bibliotecaStore from "@/store/bibliotecaStore";
import socioStore from "@/store/socioStore";
import personaStore from "@/store/personaStore";
export default {
  name: "MisDatos",

  data: () => ({
    item: null,
    img: [],
    tab: null,
    emailRules: [
      v => !!v || "Debe ingresar su E-mail",
      v => /.+@.+\..+/.test(v) || "El E-mail ingresado no es valido"
    ],
    bibliotecas: [],
    element: 1,
    passwordRules: [v => !!v || "Debe ingresar una contraseña"],
    showPassword: false,
    isLoading: true,
    textFieldRules: [v => !!v || "Debe ingresar el valor solicitado."],
    selectFieldRules: [v => !!v || "Debe seleccionar el valor solicitado."],
    textFieldRulesWithMin: [
      v => !!v || "Debe ingresar el valor solicitado.",
      v =>
        v.length > 8 || "El valor solicitado debe ser de al menos 8 caracteres."
    ]
  }),

  methods: {
    ...mapActions("socioStore", {
      socioGetByID: "getByID",
      socioUpdate: "updateEntity",
      socioCreate: "saveEntity",
      socioIMG: "uploadImg"
    }),
    ...mapActions("bibliotecaStore", { biblioGetAll: "getAll" }),
    ...mapActions("personaStore", { personaUpdate: "updateEntity" }),
    goBack() {
      this.$router.go(-1);
    },
    async updateItem() {
      for (let key in this.item) {
        if (!this.item[key] && key !== "id")
          return this.$toasted.error("No pueden haber campos vacios.", {
            icon: "mdi-alert"
          });
      }
      await this.personaUpdate(this.item.persona);
      setTimeout(async () => {
        await this.socioUpdate(this.item);
      }, 3000);
      setTimeout(() => {
        this.$router.go(-1);
      }, 1000);
    },
    async updateIMG() {
      if (this.img) {
        // eslint-disable-next-line no-console
        console.log(this.img);
        if (this.img.size > 2000000)
          return this.$toasted.error(
            "El archivo adjunto supera los 2MB de tamaño."
          );
        if (
          this.img.type === "image/jpeg" ||
          this.img.type === "image/png" ||
          this.img.type === "image/bmp"
        ) {
          let item = {
            img: this.img,
            id: this.item.id
          };
          let result = await this.socioIMG(item);
          this.item.imgAvatar = result.data;
        } else
          return this.$toasted.error(
            "El archivo adjunto no es una imagen de formato compatible."
          );
      }
    }
  },

  computed: {
    ...mapState("bibliotecaStore", { biblios: "arrayEntity" }),
    ...mapState("socioStore", ["entity"])
  },

  async mounted() {
    try {
      this.isLoading = true;
      await this.$store.registerModule("bibliotecaStore", bibliotecaStore);
      await this.$store.registerModule("socioStore", socioStore);
      await this.$store.registerModule("personaStore", personaStore);
      let id = this.$route.params.id;
      if (id) {
        await this.socioGetByID(id);
        this.item = this.entity;
        if (!this.item.imgAvatar)
          this.item.imgAvatar =
            "https://semantic-ui.com/images/wireframe/white-image.png";
      } else this.$router.go(-1);
      await this.biblioGetAll();
      this.biblios.forEach(element => {
        this.bibliotecas.push({
          text: element.nombre + " " + element.ciudad.nombre,
          value: element
        });
      });
    } catch (error) {
      this.$toasted.error("No han podido ser cargado los datos necesarios.", {
        icon: "mdi-alert"
      });
    } finally {
      this.isLoading = false;
    }
  },

  beforeDestroy() {
    this.$store.unregisterModule("bibliotecaStore");
    this.$store.unregisterModule("socioStore");
    this.$store.unregisterModule("personaStore");
  }
};
</script>

<style></style>
