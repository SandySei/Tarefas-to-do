<template>
  <v-card v-for="list in toDoListis" :key="list.id">
    <v-card-title>{{ list.title }}</v-card-title>
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
        alert("Algo deu errado.");
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>
