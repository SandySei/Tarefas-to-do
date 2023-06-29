<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        class="bg-grey-darken-4 elevation-20"
      >
        <div class="h-100 d-flex flex-column">
          <v-list>
            <v-img
              height="100"
              src="@/assets/Tarefas1.png"
            ></v-img>
          </v-list>

          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi mdi-plus"
              title="Adicionar Lista de Tarefas"
              to="/addItem"
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-folder-open"
              title="Minhas Tarefas"
              to="/inicial"
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-format-list-checks"
              v-for="list in toDoListis"
              :key="list.id"
              :to="`/viewItem/${list.id}`"
              :title="list.title"
            >
            </v-list-item>
          </v-list>

          <v-list class="d-flex align-end flex-grow-1" density="compact" nav>
            <v-list-item
              class="bg-red-darken-4 w-100"
              @click="logOut"
              prepend-icon="mdi-power"
              title="Sair"
            ></v-list-item>
          </v-list>
        </div>
      </v-navigation-drawer>

      <v-main>
        <router-view
          @getLists="getLists"
          :lists="toDoListis"
          :selectedList="$route.params.id"
          @snackbar="sendSnackbarEvent"
        ></router-view>
    </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { toDoListApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListApiMixin],
  data() {
    return {
      toDoListis: [],
    };
  },

  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoListis = data;
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado!");
      }
    },
    logOut() {
      try {
        localStorage.removeItem("access_token");
        this.$emit("snackbar", "Logout realizado com sucesso!");
        this.$router.push("/");
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado!");
      }
    },
    sendSnackbarEvent(message) {
      this.$emit("snackbar", message);
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
