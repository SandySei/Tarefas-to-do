<template>
  <span class="mdi mdi-power cursor-pointer" @click="logOut"></span>
</template>
<img src="../assets/shutdown.png" @click="logOut" class="cursor-pointer" />

<script>
export default {
  methods: {
    logOut() {
      try {
        localStorage.removeItem("access_token");
        alert("Logout realizado com sucesso");
        this.$router.push("/");
      } catch (err) {
        alert("Algo deu errado!");
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
  width: 50px;
}
</style>
