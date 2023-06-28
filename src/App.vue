<template>
  <router-view
    @snackbar="setupSnackbar"
    :isSnackBarOpen="isSnackBarOpen"
  ></router-view>
  <v-snackbar :timeout="2000" color="red-accent-4" v-model="isSnackBarOpen">
    {{ snackbarText }}
  </v-snackbar>
</template>

<script>
import { setupPrivateApi } from "./api";

export default {
  data() {
    return {
      isSnackBarOpen: false,
      snackbarText: "",
    };
  },
  methods: {
    setupSnackbar(message) {
      console.log(message);
      this.isSnackBarOpen = true;
      this.snackbarText = message;
    },
  },
  mounted() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.$router.push("/");
      return;
    }
    setupPrivateApi(token);
  },
};

window.addEventListener("mouseout", function (event) {
  if (event.clientY <= 0) {
    document.title = "Não esqueça as tarefas!";
  }
});

window.addEventListener("blur", function () {
  document.title = "Não esqueça as TAREFAS!";
});

// Evento disparado quando a janela retoma o foco (o usuário volta para a aba)
window.addEventListener("focus", function () {
  document.title = "Tarefas";
});
</script>
