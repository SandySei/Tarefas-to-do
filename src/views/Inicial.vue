<template>oi</template>

<script>
import { toDoListApiMixin } from "@/api/toDoList";
export default {
  mixins: [toDoListApiMixin],
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        console.log(data);
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
