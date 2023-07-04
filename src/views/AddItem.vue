<template>
  <v-card-text
    class="d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-btn
        class="w-100 mb-3"
        prepend-icon="mdi-arrow-left"
        :to="`/task/${id}`"
      >
        Voltar
      </v-btn>

      <v-card-title
        class="pb-3 text-h4 mb-3 text-cyan-darken-1 bg-grey-darken-3 rounded text-center"
      >
        Adicionar Item na Lista!
      </v-card-title>

      <v-card class="pa-4 bg-grey-lighten-2">
        <v-text-field
          prepend-icon="mdi-pencil"
          v-model="title"
          label="Título do item "
          :rules="titleRules"
        ></v-text-field>

        <input
          type="datetime-local"
          :value="myDate"
          @input="handleDateChange"
          class="custom-input ma-2 ml-10 mb-5"
        />

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
  <LoadingComponent v-if="loading" />
</template>

<script>
import { toDoListItemApiMixin } from "@/api/toDoItem";
import LoadingComponent from "@/components/Loading.vue";

export default {
  mixins: [toDoListItemApiMixin],

  components: {
    LoadingComponent,
  },

  data: () => ({
    loading: false,
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
      this.loading = true;
      const payload = {
        title: this.title,
        deadline: this.dateToISOString(this.myDate),
        listId: this.id,
      };

      try {
        await this.addListItem(payload);
        this.$emit("snackbar", "Item da lista criado com sucesso!");
        this.$router.push(`/task/${this.id}`);
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
      this.loading = false;
    },

    handleDateChange(e) {
      const { value } = e.target;
      this.myDate = value;
    },
  },
};
</script>

<style scoped>
.custom-input {
  width: 50%;
  height: 60px;
  padding: 8px;
  background-color: rgb(244, 244, 244);
  border-radius: 4px;
}
</style>
