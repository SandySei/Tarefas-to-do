<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card-title class="pb-3 text-h4 text-grey">
        Visualização do Item!
      </v-card-title>
      <v-text-field v-model="title" label="Título do item "></v-text-field>

      <v-btn
        :disabled="!isFormValid"
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        @click="uptLists"
        >Atualizar</v-btn
      >
      <router-link to="/Inicial"><v-btn block="">Voltar</v-btn></router-link>
      <v-btn color="grey-darken-2" block class="mt-2" @click="delLists()"
        >Deletar</v-btn
      >
      <router-link :to="`/addListItem/${this.id}`">
        <v-btn color="grey-darken-2" block class="mt-2"
          >Adicionar List Items</v-btn
        ></router-link
      >
      <v-card v-for="list in itemList" :key="list.id" variant="outlined">
        <router-link :to="`/viewItemList/${list.id}`">
          <v-card-title>{{ list.title }}</v-card-title>
          <v-card-text>
            {{ formatDate(list.deadline) }}
            <v-checkbox v-model="list.done" :label="`Finalizado?`"></v-checkbox>
          </v-card-text>
        </router-link>
      </v-card>
    </v-form>
  </v-card-text>
</template>
<script>
import { toDoListApiMixin } from "@/api/toDoList";
import moment from "moment";
export default {
  mixins: [toDoListApiMixin],
  data() {
    const id = this.$route.params.id;
    let title = "";
    return {
      id: id,
      title: this.title,
      itemList: [],
    };
  },
  methods: {
    formatDate(date) {
      const modifiedDate = moment(date).add(0, "hours");
      return modifiedDate.format("DD/MM/YYYY HH:mm");
    },
    async getItemLists(id) {
      try {
        const { data } = await this.viewItem(id);
        this.itemList = data.items;
      } catch (err) {
        alert("Algo deu errado na hora de puxar os item list.");
      }
    },
    async getLists() {
      try {
        const { data } = await this.viewItem(this.id);
        this.title = data.title;
      } catch (err) {
        alert("Algo deu errado.");
      }
    },
    async delLists() {
      try {
        await this.delItem(this.id);
        alert("Item apagado com sucesso");
        this.$router.push("/Inicial");
      } catch (err) {
        alert("Algo deu errado na hora de deletar.");
      }
    },
    async uptLists() {
      const payload = {
        title: this.title,
      };
      try {
        await this.uptItem(this.id, payload);
        alert("Item atualizado com sucesso");
        this.$router.push("/Inicial");
      } catch (err) {
        alert("Algo deu errado na hora de atualizar.");
      }
    },
  },

  mounted() {
    this.getLists();
    this.getItemLists(this.id);
  },
};
</script>
