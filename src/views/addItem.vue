<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card-title class="pb-3 text-h4 text-grey">
        Cadastro de Item!
      </v-card-title>
      <v-text-field
        v-model="title"
        label="Título do item "
        :rules="titleRules"
      ></v-text-field>

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
        :to="`/Inicial/`"
        >Voltar</v-btn
      >
    </v-form>
  </v-card-text>
</template>

<script>
/* import required from "@/utils/validation/required";
 */ import { toDoListApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListApiMixin],
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
  }),

  methods: {
    /*handleSubmit(event) {
      event.preventDefault();
      if (!this.FormValid) {
        return;
      }
    },*/

    async handleSubmit() {
      const payload = {
        title: this.title,
      };

      try {
        await this.addItem(payload);
        alert("Item criado com sucesso!");
        this.$router.push("/inicial");
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
