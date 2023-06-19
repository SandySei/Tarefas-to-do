<template>
  <v-app>
    <v-container
      class="d-flex flex-column justify-center align-center text-center h-100"
    >
      <v-toolbar
        fixed-tabs
        class="d-flex justify-space-evenly alising-center bg-deep-orange w-100"
      >
        <router-link to="/" class="w-100 h-100">
          <v-tab class="text-black w-100 h-100" value="Entrar"> Entar </v-tab>
        </router-link>
        <router-link to="/cadastro" class="w-100 h-100">
          <v-tab class="text-black w-100 h-100" value="Cadastro">
            Cadastro
          </v-tab>
        </router-link>
      </v-toolbar>

      <v-card class="d-flex flex-row align-center bg-grey-darken-4 w-100 h-85">
        <v-img
          :width="60"
          aspect-ratio="3/4"
          src="@/assets/imagens/Home.jpg"
        ></v-img>
        <v-main class="w-25">
          <router-view></router-view>
        </v-main>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup></script>
