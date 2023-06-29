<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card-title class="pb-3 text-h4 text-grey">
        Visualizar de Item da Lista!
      </v-card-title>
      <v-text-field
        v-model="title"
        label="Título do item "
        readonly=""
      ></v-text-field>
      <input
        type="datetime-local"
        :value="dateToISOString(myDate)"
        @input="myDate = new Date($event.target.value)"
        readonly
      />
      <v-checkbox v-model="this.done" :label="`Finalizado?`"></v-checkbox>
      <v-btn
        :disabled="!isFormValid"
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        @click="handleSubmit"
        >Atualizar</v-btn
      >
      <v-btn
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        @click="deleteItem"
        >Apagar</v-btn
      >
      <v-btn
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        :to="`/viewItem/${idPai}`"
        >Voltar</v-btn
      >
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
      const payload = {
        done: this.done,
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
