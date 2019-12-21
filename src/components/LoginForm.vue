<template>
  <v-card
    class="animated slideInUp overflow-y-auto"
    height="525"
    max-width="322"
    width="322"
    :loading="fetchLogin"
  >
    <v-tabs
      v-model="tab"
      fixed-tabs
      hide-slider
      background-color="secondary"
      dark
      active-class="secondary darken-2"
    >
      <v-tab>Iniciar sesión</v-tab>
      <v-tab>Registrarse</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item class="mx-4" :value="0">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="12">
            <v-card-title class="pt-8">
              <v-spacer />
              <v-chip x-large color="primary" class="pa-4">
                <v-icon large>mdi-account</v-icon>
              </v-chip>
              <v-spacer />
            </v-card-title>
            <v-card-title class="justify-center text-uppercase"
              >Inicio sesión</v-card-title
            >
            <v-card-text>
              <v-form lazy-validation ref="form">
                <v-text-field
                  append-icon="mdi-email"
                  rounded
                  filled
                  :rules="emailRules"
                  label="E-mail"
                  type="text"
                  @keyup.enter="validateLogin"
                  v-model="socio.email"
                />
                <v-text-field
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  rounded
                  filled
                  :rules="passwordRules"
                  label="Contraseña"
                  @keyup.enter="validateLogin"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="socio.password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="py-4">
              <v-spacer />
              <v-btn color="primary" block rounded @click="validateLogin"
                >Acceder</v-btn
              >
              <v-spacer />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :value="1">
        <v-form lazy-validation>
          <v-stepper v-model="element" vertical class="elevation-0" non-linear>
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
                @keyup.enter="validateLogin"
                v-model="registroSocio.persona.nombre"
              />
              <v-text-field
                rounded
                filled
                :rules="[v => !!v || 'Debe ingresar su apellido paterno']"
                label="Apellido Paterno"
                type="text"
                @keyup.enter="validateLogin"
                v-model="registroSocio.persona.apellidoPaterno"
              />
              <v-text-field
                rounded
                filled
                :rules="[v => !!v || 'Debe ingresar su apellido materno']"
                label="Apellido Materno"
                type="text"
                @keyup.enter="validateLogin"
                v-model="registroSocio.persona.apellidoMaterno"
              />
              <v-text-field
                rounded
                filled
                :rules="[v => !!v || 'Debe ingresar su RUT']"
                label="RUT"
                type="text"
                @keyup.enter="validateLogin"
                v-model="registroSocio.persona.rut"
              />
              <v-row justify="end" no-gutters>
                <v-btn depressed fab small color="primary" @click="++element">
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
                @keyup.enter="validateLogin"
                v-model="registroSocio.email"
              />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                rounded
                filled
                :rules="passwordRules"
                label="Contraseña"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                @keyup.enter="validateLogin"
                v-model="registroSocio.password"
              />
              <v-row justify="end" no-gutters>
                <v-btn depressed fab small color="primary" @click="--element">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn depressed fab small color="primary" @click="++element">
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
                v-model="registroSocio.biblioteca"
                label="Biblioteca preferida"
                :rules="[v => !!v || 'Debe seleccionar una biblioteca']"
              />
              <v-row justify="end" no-gutters>
                <v-btn depressed fab small color="primary" @click="--element">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn
                  depressed
                  rounded
                  large
                  color="primary"
                  @click="register"
                >
                  <v-icon class="mr-1">mdi-check</v-icon>
                  <span>Enviar</span>
                </v-btn>
              </v-row>
            </v-stepper-content>
          </v-stepper>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Vue from "vue";
import bibliotecaStore from "@/store/bibliotecaStore";
import personaStore from "@/store/personaStore";
import socioStore from "@/store/socioStore";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "loginForm",

  data: () => ({
    fetchLogin: false,
    socio: {
      email: null,
      password: null
    },
    registroSocio: {
      email: null,
      password: null,
      biblioteca: null,
      imgAvatar:
        "https://icon-library.net/images/avatar-icon-png/avatar-icon-png-9.jpg",
      persona: {
        id: null,
        nombre: null,
        apellidoPaterno: null,
        apellidoMaterno: null,
        rut: null
      }
    },
    bibliotecas: [],
    buttonEnable: true,
    tab: 0,
    emailRules: [
      v => !!v || "Debe ingresar su E-mail",
      v => /.+@.+\..+/.test(v) || "El E-mail ingresado no es valido"
    ],
    element: 1,
    passwordRules: [v => !!v || "Debe ingresar una contraseña"],
    showPassword: false
  }),

  async beforeMount() {
    this.$store.registerModule("bibliotecaStore", bibliotecaStore);
    this.$store.registerModule("personaStore", personaStore);
    this.$store.registerModule("socioStore", socioStore);
    await this.biblioGetAll();
    this.biblios.forEach(element => {
      this.bibliotecas.push({
        text: element.nombre + " " + element.ciudad.nombre,
        value: element
      });
    });
  },

  beforeDestroy() {
    this.$store.unregisterModule("bibliotecaStore");
    this.$store.unregisterModule("personaStore");
    this.$store.unregisterModule("socioStore");
  },
  computed: {
    ...mapState("bibliotecaStore", { biblios: "arrayEntity" }),
    ...mapState("personaStore", { personaCreada: "resultCreate" })
  },

  methods: {
    async register() {
      if (this.checkProperties(this.registroSocio) === false)
        return this.$toasted.error(
          "Compruebe los datos ingresados antes de volver a enviar."
        );
      else {
        this.fetchLogin = true;
        try {
          await this.createPersona(this.registroSocio.persona);
          setTimeout(async () => {
            // eslint-disable-next-line no-console
            console.log(this.personaCreada);
            this.registroSocio.persona.id = await this.personaCreada.data.data
              .id;
            // eslint-disable-next-line no-console
            console.log(this.registroSocio);
            let result = await this.createSocio(this.registroSocio);
            if (result === false)
              return this.$toasted.error(
                "Error en el registro... vuelva a intentar más tarde",
                { icon: "mdi-alert" }
              );
            else {
              this.$toasted.success("Registrado con exito!", {
                icon: "mdi-check"
              });
            }
            this.tab = 0;
            this.registroSocio = {
              email: null,
              password: null,
              biblioteca: null,
              imgAvatar:
                "https://icon-library.net/images/avatar-icon-png/avatar-icon-png-9.jpg",
              persona: {
                id: null,
                nombre: null,
                apellidoPaterno: null,
                apellidoMaterno: null,
                rut: null
              }
            };
            this.fetchLogin = false;
            this.socio = { email: null, password: null };
          }, 3000);
        } catch (e) {
          this.$toasted.error(
            "Error en el registro... vuelva a intentar más tarde",
            { icon: "mdi-alert" }
          );
        } finally {
          this.fetchLogin = false;
        }
      }
    },
    checkProperties(obj) {
      for (var key in obj) {
        if (obj[key] === null || obj[key] === "") return false;
      }
      return true;
    },
    async validateLogin() {
      this.fetchLogin = true;
      let login = await this.login(this.socio);
      if (login === true) {
        this.$router.push("home");
        this.$toasted.success("Bienvenido a Mi biblioteca!", {
          icon: "mdi-checkbox-marked-circle"
        });
      } else {
        this.fetchLogin = false;
        this.$toasted.error("E-mail y/o contraseña invalidos", {
          icon: "mdi-alert "
        });
      }
    },
    ...mapActions(["login"]),
    ...mapActions("bibliotecaStore", { biblioGetAll: "getAll" }),
    ...mapActions("personaStore", { createPersona: "saveEntity" }),
    ...mapActions("socioStore", { createSocio: "saveEntity" })
  }
});
</script>

<style></style>
