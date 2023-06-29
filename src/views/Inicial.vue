<template>
  <v-container class="w-75 d-flex flex-column justify-self-center">
    <v-img height="100" src="@/assets/Tarefasextenso.png" class="pa-2"></v-img>

    <router-link to="/addItem" class="text-decoration-none">
      <v-card prepend-icon="mdi-plus" class="ma-3 d-flex">
        <template v-slot:title> Adicionar Lista de Tarefas </template>
      </v-card>
    </router-link>

    <div class="bg-grey-lighten-2 pa-4 rounded-t-xl rounded-b-xl elevation-20 mb-5">

      <v-text-field v-model="searchQuery" label="Procurar" outlined class="color- pl-5 pr-5"></v-text-field>
      
      <div class="pl-2 pr-2">
        
        <v-card
          v-for="list in filteredLists"
          :key="list.id"
          variant="tonal"
          class="ma-2 bg-grey-lighten-4"
        >
          <router-link
            :to="`/viewItem/${list.id}`"
            class="text-decoration-none d-flex align-center justify-space-between pl-15 pr-16"
          >
            <v-card-title class="text-black">{{ list.title }}</v-card-title>

            <v-icon
              icon="mdi mdi-file-edit"
              size="large"
              color="black"
            ></v-icon>
          </router-link>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { toDoListApiMixin } from "@/api/toDoList";
export default {
  mixins: [toDoListApiMixin],
  props: {
    lists: Array,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    filteredLists() {
      if (this.searchQuery) {
        return this.lists.filter(list =>
          list.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.lists;
    },
  },
  mounted() {
    this.$emit("getLists");
  },
};
</script>
