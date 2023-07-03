<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-btn
        class="w-100 mb-3"
        prepend-icon="mdi-arrow-left"
        :to="`/viewItem/${idPai}`"
      >
        Voltar
      </v-btn>

      <v-card-title class="pb-3 text-h4 mb-3 text-cyan-darken-1 bg-grey-darken-3 rounded  text-center">
        Editar Item da Lista!
      </v-card-title>

      <v-card class="pa-4 bg-grey-lighten-2">
        <v-text-field
          v-model="title"
          prepend-icon="mdi-pencil"
          label="Item da Lista"
        ></v-text-field>

        <div class="d-flex">
          <v-checkbox v-model="this.done" :label="`Finalizado?`"></v-checkbox>

          <input
            type="datetime-local"
            :value="dateToISOString(myDate)"
            @input="myDate = new Date($event.target.value)"
            class="custom-input ma-2 mb-3"
          />
        </div>

        <div class="d-flex flex-row w-100">
          <v-btn
            class="w-50 bg-grey-darken-2"
            prepend-icon="mdi-refresh"
            @click="handleSubmit"
            >Atualizar</v-btn
          >
          <v-btn
            class="w-50 ml-1"
            color="grey-darken-2"
            type="submit"
            prepend-icon="mdi-delete"
            @click="deleteItem"
            >Apagar</v-btn
          >
        </div>
      </v-card>
    </v-form>
  </v-card-text>
</template>

<script>
import { toDoListItemApiMixin } from "@/api/toDoItem";

export default {
  mixins: [toDoListItemApiMixin],
  data: () => ({
    title: "",
    myDate: "",
    id: null,
    done: Boolean,
    idPai: "",
  }),
  created() {
    this.id = this.$route.params.id;
  },

  methods: {
    dateToISOString(date) {
      if (!date) return "";

      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 3);

      return adjustedDate.toISOString().slice(0, 16);
    },
    async getItemLists() {
      try {
        const { data } = await this.viewListItem(this.id);
        this.title = data.title;
        this.myDate = new Date(data.deadline);
        this.done = data.done;
        this.idPai = data.listId;
      } catch (err) {
        this.$emit(
          "snackbar",
          "Algo deu errado na hora de puxar esse item list!"
        );
      }
    },
    async handleSubmit() {
      const dataCorrigida = new Date(this.myDate);
      const payload = {
        done: this.done,
        title: this.title,
        deadline: dataCorrigida.toISOString,
      };

      try {
        await this.uptListItem(this.id, payload);
        this.$emit("snackbar", "Item da lista atualizado com sucesso!");
        this.$router.push(`/viewItem/${this.idPai}`);
      } catch (err) {
        const status = err?.response?.status;
        if (status >= 500 && status < 600) {
          this.$emit(
            "snackbar",
            "Ocorreu um erro no servidor! Tente novamente mais tarde!"
          );
        } else {
          this.$emit(
            "snackbar",
            "Algo deu errado. Pedimos desculpas pelo inconveniente!"
          );
        }
      }
    },
    async deleteItem() {
      try {
        await this.delListItem(this.id);
        this.$emit("snackbar", "Item da lista apagado com sucesso!");
        this.$router.push(`/viewItem/${this.idPai}`);
      } catch (err) {
        const status = err?.response?.status;
        if (status >= 500 && status < 600) {
          this.$emit(
            "snackbar",
            "Ocorreu um erro no servidor! Tente novamente mais tarde!"
          );
        } else {
          this.$emit(
            "snackbar",
            "Algo deu errado. Pedimos desculpas pelo inconveniente!"
          );
        }
      }
    },
  },
  mounted() {
    this.getItemLists();
  },
};
</script>

<style>
.custom-input {
  width: 50%;
  padding: 8px;
  background-color: rgb(244, 244, 244);
  border-radius: 4px;
}
</style>
