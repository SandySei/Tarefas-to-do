<template>
  <v-container>
    <router-link to="/addItem">
      <v-btn color="grey-darken-2" block class="mt-2">
        Adicionar Grupo de Trarefas</v-btn
      >
    </router-link>

    <v-card v-for="list in lists" :key="list.id" variant="outlined">
      <router-link :to="`/viewItem/${list.id}`">
        <v-card-title>{{ list.title }}</v-card-title>
      </router-link>
    </v-card>
  </v-container>
</template>

<script>
import { toDoListApiMixin } from "@/api/toDoList";
export default {
  mixins: [toDoListApiMixin],
  props: {
    lists: Array,
  },
  mounted() {
    this.$emit("getLists");
  },
};
</script>
