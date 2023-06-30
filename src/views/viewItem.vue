<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card class="d-flex w-100 bg-red">
        <v-dialog v-model="dialog" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-pencil" v-bind="props" size="small"></v-btn>
          </template>
          <v-card>
            <v-container class="bg-grey-darken-3">
              <v-card-text class="text-h4 text-cyan text-center"
                >Aletere o título</v-card-text
              >
              <v-text-field
                v-model="title"
                label="Título do item "
              ></v-text-field>
              <v-card-text>
                Se você preferir manter o título intacto, basta clicar em
                qualquer parte fora do campo para encerrar.</v-card-text
              >
              <v-card-actions class="w-100">
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  variant="default"
                  block
                  class="mt-2 w-50"
                  @click="uptLists"
                  >Atualizar</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>

        <v-card-title class="ml-3 text-h4 text-black">
          {{ this.title }}
        </v-card-title>
      </v-card>

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
  props: {
    selectedList: String,
  },
  data() {
    let title = "";
    return {
      id: this.$props.selectedList,
      title: this.title,
      itemList: [],
      dialog: false,
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
        this.$emit(
          "snackbar",
          "Algo deu errado na hora de puxar os item list!"
        );
      }
    },
    async getLists(id) {
      try {
        const { data } = await this.viewItem(id);
        this.title = data.title;
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado!");
      }
    },
    async delLists() {
      try {
        await this.delItem(this.id);
        this.$emit("snackbar", "Item apagado com sucesso!");
        this.$router.push("/Inicial");
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado na hora de deletar!");
      }
    },
    async uptLists() {
      const payload = {
        title: this.title,
      };
      try {
        await this.uptItem(this.id, payload);
        this.$emit("snackbar", "Item atualizado com sucesso!!");
        this.dialog = false;
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado na hora de Atualizar!");
      }
    },
  },

  mounted() {
    this.getLists(this.id);
    this.getItemLists(this.id);
  },
  updated() {
    this.getLists(this.$props.selectedList);
    this.getItemLists(this.$props.selectedList);
  },
};
</script>
