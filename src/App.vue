<template>
  <router-view></router-view>
</template>

<script>
import { setupPrivateApi } from "./api";

export default {
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
    document.title = "Não saia, por favor!";
  }
});

window.addEventListener("blur", function () {
  document.title = "Volta aqui fazer o cadastro!";
});

// Evento disparado quando a janela retoma o foco (o usuário volta para a aba)
window.addEventListener("focus", function () {
  document.title = "Aesthetic";
});
</script>
