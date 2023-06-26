<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card-title class="pb-3 text-h4 text-grey">
        Cadastro de Item da Lista(interno)!
      </v-card-title>
      <v-text-field
        v-model="title"
        label="Título do item "
        :rules="titleRules"
      ></v-text-field>
      <input type="datetime-local" v-model="myDate" />
      {{ myDate }}
      <v-date-picker width="400"></v-date-picker>
      <v-btn
        :disabled="!isFormValid"
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        @click="handleSubmit"
        >Adicionar</v-btn
      >
      <v-btn
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        :to="`/viewItem/${id}`"
        >Voltar</v-btn
      >
      <router-link to="/Inicial">Voltar</router-link>
    </v-form>
  </v-card-text>
</template>

<script>
import { toDoListItemApiMixin } from "@/api/toDoItem";

export default {
  mixins: [toDoListItemApiMixin],
  data: () => ({
    title: "",
    titleRules: [
      (value) => {
        if (!/^.+$/.test(value)) return "Campo Obrigatório";
        if (/.*[*!#@().$%&]/.test(value))
          return "O nome não deve conter caracteres.";
        return true;
      },
    ],
    myDate: new Date(),
    id: null,
  }),
  created() {
    this.id = this.$route.params.id;
  },

  methods: {
    /*    dateToISOString(date) {
      if (!date) return "";

      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 3);

      return adjustedDate.toISOString().slice(0, 16);
    },*/

    async handleSubmit() {
      const payload = {
        title: this.title,
        deadline: this.myDate,
        listId: this.id,
      };
      console.log(payload);

      try {
        await this.addListItem(payload);
        alert("Item da lista criado com sucesso!");
        this.$router.push(`/viewItem/${this.id}`);
      } catch (err) {
        const status = err?.response?.status;
        console.log(err);
        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor! Tente novamente mais tarde.");
        } else {
          alert("Algo deu errado. Pedimos desculpas pelo inconveniente.");
        }
      }
    },
  },
};
</script>
