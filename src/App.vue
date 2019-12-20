<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data: () => ({
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
  }
};
</script>

<style>
@import url("./assets/css/animate.css");
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif !important;
}

.roboto {
  font-family: "Roboto", sans-serif !important;
}

.open-sans {
  font-family: "Open Sans", sans-serif !important;
}
</style>
