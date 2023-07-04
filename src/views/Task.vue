<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent class="w-50">
      <router-link class="w-50" to="/home">
        <v-btn class="w-100 mb-3" prepend-icon="mdi-arrow-left">
          Voltar
        </v-btn></router-link
      >

      <v-card class="d-flex w-100 bg-red-accent-4 pa-2 pt-3 mb-3 align-center">
        <v-icon icon="mdi-list-status" size="x-large" class="ml-4"></v-icon>
        <v-card-title class="ml-3 text-h4 text-white ma-2">
          {{ this.title }}
        </v-card-title>
      </v-card>

      <div class="d-flex flex-row w-100 justify-center">
        <v-dialog v-model="dialog1" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn
              class="w-50 mr-1 bg-grey-darken-3"
              prepend-icon="mdi-pencil"
              v-bind="props"
              >Editar</v-btn
            >
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
                qualquer parte fora do campo cinza escuro para
                encerrar.</v-card-text
              >
              <v-card-actions class="w-100">
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  v-model="isFormValid"
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

        <v-dialog v-model="dialog2" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn
              class="w-50 bg-grey-darken-3"
              prepend-icon="mdi-delete"
              v-bind="props"
              >Apagar</v-btn
            >
          </template>
          <v-card>
            <v-container class="bg-grey-darken-3">
              <v-card-text class="text-h4 text-cyan text-center"
                >Tem certeza que quer apagar a lista: <br /><br />
                {{ this.title }}?</v-card-text
              >
              <v-card-text>
                Se você preferir manter a lista, basta clicar em qualquer parte
                fora do campo cinza escuro para encerrar.</v-card-text
              >
              <v-card-actions class="w-100">
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  variant="default"
                  block
                  class="mt-2 w-50"
                  @click="delLists()"
                  >Apagar</v-btn
                >
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
      </div>

      <router-link :to="`/additem/${this.id}`">
        <v-btn class="w-100 mt-1 mb-3 bg-grey-darken-3" prepend-icon="mdi-plus"
          >Adicionar Item na Lista</v-btn
        ></router-link
      >
      <v-card
        v-for="list in itemList"
        :key="list.id"
        class="bg-grey-lighten-3 mb-2 d-flex flex-row"
      >
        <router-link
          class="text-decoration-none text-grey-darken-3 d-flex flex-row"
          :to="`/item/${list.id}`"
        >
          <v-checkbox v-model="list.done"></v-checkbox>
          <v-card-title>{{ list.title }}</v-card-title>
          <v-card-text class="align-self-end just justify-end">
            <div class="deadline">{{ formatDate(list.deadline) }}</div>
          </v-card-text>
        </router-link>
      </v-card>
    </v-form>
  </v-card-text>
  <LoadingComponent v-if="loading" />
</template>

<script>
import { toDoListApiMixin } from "@/api/toDoList";
import moment from "moment";
import LoadingComponent from "@/components/Loading.vue";

export default {
  mixins: [toDoListApiMixin],

  components: {
    LoadingComponent,
  },

  props: {
    selectedList: String,
  },

  data() {
    let title = "";
    return {
      loading: false,
      id: this.$props.selectedList,
      itemList: [],
      dialog1: false,
      dialog2: false,
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

        // Ordena o array em ordem alfabética
        this.itemList.sort((a, b) => a.title.localeCompare(b.title));
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
        this.$router.push("/home");
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
        this.dialog1 = false;
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
<style>
.deadline {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 8px;
}
</style>
