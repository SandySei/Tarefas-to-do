<template>
  <v-container class="w-75 d-flex flex-column justify-self-center">
    <div class="w-100 d-flex align-items-center flex-row">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        class="w-75 altura-x"
        label="Procurar"
        variant="solo-inverted"
        :hide-details="true"
      ></v-text-field>

      <div class="w-25">
        <router-link to="/addItem" class="text-decoration-none">
          <v-card
            prepend-icon="mdi-plus"
            class="ml-3 d-flex altura-x add"
            elevation="2"
          >
            <template v-slot:title>Lista de Tarefas </template>
          </v-card>
        </router-link>
      </div>
    </div>

    <v-img
      height="100"
      src="@/assets/TarefasInicial.png"
      class="mt-5 mb-5"
    ></v-img>

    <div
      class="bg-grey-darken-4 pa-4 rounded-lg elevation-10 mb-5"
    >
      <v-card-title class="text-red-accent-4">Minhas Listas:</v-card-title>
      <div class="pl-2 pr-2">
        <v-card
          v-for="list in filteredLists"
          :key="list.id"
          class="my-2 bg-grey-darken-3"
        >
          <router-link
            :to="`/viewItem/${list.id}`"
            class="text-decoration-none d-flex align-center justify-space-between pl-15 pr-16"
          >
            <v-card-title class="text-white">{{ list.title }}</v-card-title>

            <v-icon
              icon="mdi mdi-file-edit"
              size="large"
              color="white"
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
        return this.lists.filter((list) =>
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

<style>
.altura-x {
  height: 55px;
}

.altura-x .v-input__control {
  height: 55px !important;
}

.add:active {
  background-color: #424242;
  color: white;
}
</style>
