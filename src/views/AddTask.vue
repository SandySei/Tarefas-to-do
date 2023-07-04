<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-btn class="w-100 mb-3" prepend-icon="mdi-arrow-left" :to="`/home/`">
        Voltar
      </v-btn>

      <v-card-title
        class="pb-3 text-h4 mb-3 text-cyan-darken-1 bg-grey-darken-3 rounded text-center"
      >
        Adicionar Lista de Tarefas
      </v-card-title>

      <v-card class="pa-4 bg-grey-lighten-2">
        <v-text-field
          prepend-icon="mdi-pencil"
          v-model="title"
          label="Título do item "
          :rules="titleRules"
        ></v-text-field>

        <v-btn
          class="w-100 bg-grey-darken-2"
          :disabled="!isFormValid"
          prepend-icon="mdi-plus"
          @click="handleSubmit"
          >Adicionar</v-btn
        >
      </v-card>
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
    async handleSubmit() {
      const payload = {
        title: this.title,
      };

      try {
        await this.addItem(payload);
        this.$emit("snackbar", "Item criado com sucesso!");
        this.$router.push("/home");
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
};
</script>
