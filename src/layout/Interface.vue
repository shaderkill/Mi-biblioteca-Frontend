<template>
  <v-app id="inspire" :dark="isDarkMode">
    <v-bottom-navigation
      color="primary darken-1"
      fixed
      class="animated slideInUp faster d-sm-flex d-md-flex d-lg-none d-xl-none"
    >
      <v-btn to="/home">
        <span>Inicio</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/materiales/libros">
        <span>Libros</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>

      <v-btn to="/materiales/proyectos">
        <span>Proyectos</span>
        <v-icon>mdi-book-information-variant</v-icon>
      </v-btn>

      <v-btn to="/materiales/revistas">
        <span>Revistas</span>
        <v-icon>mdi-book-multiple</v-icon>
      </v-btn>

      <v-menu
        top
        left
        content-class="overflow-y-auto mb-12 mt-n12"
        max-height="300"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            <span>Administración</span>
            <v-icon>mdi-toolbox</v-icon>
          </v-btn>
        </template>

        <v-list-item
          v-for="(item, i) in linkAdmin"
          :key="i"
          :to="item.url"
          class="back"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
          <v-list-item-action>
            <v-icon>mdi-table</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-menu>
    </v-bottom-navigation>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="back darken-1"
      class="elevation-4 d-none d-sm-none d-md-none d-xl-flex d-lg-flex"
    >
      <v-list dense>
        <v-list-item link to="/home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/materiales/libros">
          <v-list-item-action>
            <v-icon>mdi-book</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Libros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/materiales/proyectos">
          <v-list-item-action>
            <v-icon>mdi-book-information-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Proyectos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/materiales/revistas">
          <v-list-item-action>
            <v-icon>mdi-book-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Revistas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group prepend-icon="mdi-toolbox" no-action v-if="isAdmin">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administración</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(item, i) in linkAdmin" :key="i" :to="item.url">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
            <v-list-item-action>
              <v-icon>mdi-table</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:prepend>
        <div>
          <v-row justify="center" align="center" class="my-6">
            <v-btn text rounded to="/home">
              <v-icon color="primary">mdi-book-open-page-variant</v-icon>
              <span class="title ml-1">Mi biblioteca</span>
            </v-btn>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary darken-1" dark elevate-on-scroll>
      <v-icon @click.stop="drawer = !drawer" class="d-none d-md-flex d-lg-flex">
        {{ drawer ? "mdi-chevron-left" : "mdi-menu" }}
      </v-icon>
      <span class="mx-2">Mi biblioteca</span>
      <v-spacer />
      <v-toolbar-items class="align-center">
        <v-menu
          bottom
          left
          content-class="mt-4"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-chip class="px-2" color="#22222222" v-on="on">
              <v-icon>mdi-format-paint</v-icon>
              <v-chip color="primary" small class="ma-2" />
            </v-chip>
          </template>
          <v-color-picker
            v-model="primaryColor"
            hide-canvas
            hide-mode-switch
            hide-inputs
            show-swatches
            :swatches="listColors"
            mode="hexa"
          />
        </v-menu>
        <v-tooltip left color="primary">
          <template v-slot:activator="{ on }">
            <v-checkbox
              v-on="on"
              class="ma-2 mt-8"
              color="grey darken-3"
              on-icon="mdi-brightness-4"
              off-icon="mdi-brightness-7"
              v-model="isDarkMode"
              @change="setDark"
            />
          </template>
          <span>
            {{ isDarkMode ? "Cambiar a modo luz" : "Cambiar a modo oscuro" }}
          </span>
        </v-tooltip>
        <v-menu bottom left content-class="mt-4" v-if="socio">
          <template v-slot:activator="{ on }">
            <v-avatar size="36" v-on="on" class="userIMG" color="#22222222">
              <v-img :src="socio.imgAvatar" alt="user_img" />
            </v-avatar>
          </template>

          <v-list>
            <v-list-item :to="`/configurar/${idUser}`">
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Mis datos</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-avatar>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-avatar>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <transition
        enter-active-class="animated fadeInRight abs delay-1s faster"
        leave-active-class="animated fadeOutLeft abs faster"
      >
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import socioStore from "@/store/socioStore";
import { mapActions, mapState } from "vuex";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    isDarkMode: null,
    routes: [],
    idUser: null,
    socio: null,
    listColors: [
      ["#00BFA5", "#388E3C", "#FB8C00"],
      ["#EF5350", "#1976D2", "#7E57C2"]
    ],
    isAdmin: false,
    primaryColor: null,
    linkAdmin: [
      {
        text: "Bibliotecas",
        url: "/admin/biblioteca"
      },
      {
        text: "Paises",
        url: "/admin/pais"
      },
      {
        text: "Ciudades",
        url: "/admin/ciudad"
      },
      {
        text: "Categorias",
        url: "/admin/categoria"
      },
      {
        text: "Material bibliográficos",
        url: "/admin/materialbibliografico"
      },
      {
        text: "Libros",
        url: "/admin/libro"
      },
      {
        text: "Revistas",
        url: "/admin/revista"
      },
      {
        text: "Proyectos",
        url: "/admin/proyecto"
      },
      {
        text: "Prestamos",
        url: "/admin/prestamo"
      },
      {
        text: "Socios",
        url: "/admin/socio"
      }
    ]
  }),

  async beforeMount() {
    await this.fetchDarkMode();
    this.isDarkMode = this.darkMode;
    this.$vuetify.theme.dark = this.isDarkMode;
    let user = this.$store.state.accessEmail;
    user === "administrador@mibiblioteca.cl"
      ? (this.isAdmin = true)
      : (this.isAdmin = false);
    this.primaryColor = this.isDarkMode
      ? this.$vuetify.theme.themes.dark.primary
      : this.$vuetify.theme.themes.light.primary;
  },

  async mounted() {
    await this.$store.registerModule("socioStore", socioStore);
    this.idUser = this.$store.state.accessID;
    await this.socioByID(this.idUser);
    this.socio = await this.socioEntity;
    if (!this.socio.imgAvatar)
      this.socio.imgAvatar =
        "https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png";
  },

  beforeDestroy() {
    this.$store.unregisterModule("socioStore");
  },

  computed: {
    ...mapState(["darkMode"]),
    ...mapState("socioStore", { socioEntity: "entity" })
  },

  watch: {
    primaryColor: function() {
      if (this.isDarkMode)
        this.$vuetify.theme.themes.dark.primary = this.primaryColor;
      else this.$vuetify.theme.themes.light.primary = this.primaryColor;
    }
  },
  methods: {
    setDark() {
      this.$vuetify.theme.dark = this.isDarkMode;
      this.setDarkMode(this.isDarkMode);
    },
    ...mapActions(["fetchDarkMode", "setDarkMode", "logout"]),
    ...mapActions("socioStore", { socioByID: "getByID" })
  }
};
</script>

<style>
.userIMG {
  cursor: pointer;
}
</style>
