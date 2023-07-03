<template>
  <v-card elevation="0">
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        class="bg-grey-darken-4 elevation-20"
      >
        <div class="h-100 d-flex flex-column">
          <v-list>
            <router-link to="/inicial">
              <v-img height="100" src="@/assets/TarefasMenu.png"></v-img>
            </router-link>
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

            <v-divider></v-divider>

            <v-list-item
              prepend-icon="mdi-check-all"
              v-for="list in sortedLists"
              :key="list.id"
              :to="`/viewItem/${list.id}`"
              :title="list.title"
            >
            </v-list-item>

            <v-divider></v-divider>
          </v-list>

          <v-list class="d-flex align-end flex-grow-1" density="compact" nav>
            <v-list-item
              :class="{ 'bg-red-accent-4': isMouseOver }"
              class="w-100"
              @click="logOut"
              prepend-icon="mdi-power"
              title="Sair"
              @mouseover="handleMouseOver"
              @mouseleave="handleMouseLeave"
            ></v-list-item>
          </v-list>
        </div>
      </v-navigation-drawer>

      <v-main>
        <router-view
          @getLists="getLists"
          :lists="sortedLists"
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
      toDoLists: [],
      isMouseOver: false,
    };
  },
  computed: {
    sortedLists() {
      return this.toDoLists
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoLists = data;
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado!");
      }
    },
    logOut() {
      try {
        localStorage.removeItem("access_token");
        this.$emit("snackbar", "Logout realizado com sucesso!");
        this.$router.push("/");
        window.location.reload();
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado!");
      }
    },
    sendSnackbarEvent(message) {
      this.$emit("snackbar", message);
    },
    handleMouseOver() {
      this.isMouseOver = true;
    },
    handleMouseLeave() {
      this.isMouseOver = false;
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<style></style>
