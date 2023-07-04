<template>
  <v-app class="bg-grey-lighten-4">
    <v-container
      class="d-flex flex-column justify-center align-center text-center h-100"
    >
      <v-toolbar
        fixed-tabs
        class="d-flex justify-space-evenly alising-center bg-red-accent-4 w-100 elevation-20 rounded-t-xl"
      >
        <router-link to="/" class="w-100 h-100">
          <v-tab class="text-black w-100 h-100" value="Entrar"> Entar </v-tab>
        </router-link>
        <router-link to="/register" class="w-100 h-100">
          <v-tab class="text-black w-100 h-100" value="Cadastro">
            Cadastro
          </v-tab>
        </router-link>
      </v-toolbar>

      <v-card
        class="d-flex flex-row align-center bg-grey-darken-4 w-100 h-85 elevation-20 rounded-b-xl"
      >
        <v-img :width="60" aspect-ratio="3/4" src="@/assets/imagens/Home.jpg">
          <info class="d-flex align-start mt-2 ml-2"></info
        ></v-img>
        <v-main class="w-25">
          <router-view @snackbar="sendSnackbarEvent"></router-view>
        </v-main>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Info from "@/components/Info.vue";

export default {
  components: {
    Info,
  },
  methods: {
    sendSnackbarEvent(message) {
      this.$emit("snackbar", message);
    },
  },
};
</script>
