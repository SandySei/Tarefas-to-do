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
      <input type="datetime-local" :value="myDate" @input="handleDateChange" />
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
    </v-form>
  </v-card-text>
</template>

<script>
import { toDoListItemApiMixin } from "@/api/toDoItem";

export default {
  mixins: [toDoListItemApiMixin],
  data: () => ({
    isFormValid: false,
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
    dateToISOString(date) {
      if (!date) return "";
      const adjustedDate = new Date(date);

      return adjustedDate.toISOString();
    },
    async handleSubmit() {
      const payload = {
        title: this.title,
        deadline: this.dateToISOString(this.myDate),
        listId: this.id,
      };

      try {
        await this.addListItem(payload);
        this.$emit("snackbar", "Item da lista criado com sucesso!");
        this.$router.push(`/viewItem/${this.id}`);
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

    handleDateChange(e) {
      const { value } = e.target;
      this.myDate = value;
    },
  },
};
</script>
