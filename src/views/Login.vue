<template>
  <v-card-text
    class="animate__animated animate__flipInX d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card-title class="pb-5 text-h4 text-grey">
        Bem Vindo de Volta!
      </v-card-title>
      <v-text-field
        v-model="email"
        label="E-mail"
        :rules="emailRules"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Senha"
        :type="showPassword ? 'text' : 'password'"
        :rules="passwordRules"
      ></v-text-field>
      <v-checkbox
        v-model="showPassword"
        label="Ver senha"
        color="grey"
      ></v-checkbox>

      <v-btn
        color="grey-darken-2"
        type="submit"
        :disabled="!isFormValid"
        block
        class="mt-2"
        @click="handleSubmit"
        >Entrar</v-btn
      >
    </v-form>
  </v-card-text>
</template>

<script>
import { authApiMixin } from "@/api/auth";
import { setupPrivateApi } from "@/api";

export default {
  mixins: [authApiMixin],
  data: () => ({
    email: "",
    emailRules: [
      (value) => {
        //regex: string + @ + string + . + string
        if (!/^.+$/.test(value)) return "Campo Obrigatório";
        if (!/\S+@\S+\.\S+/.test(value)) return "Este não é um E-mail válido.";
        if (/\s/.test(value)) return "O E-mail não pode conter espaços.";
        if (/@.*@|\b.com.*\.com\b/.test(value))
          return "Não é possivel logar com dois E-mails.";
        return true;
      },
    ],
    showPassword: false,
    password: "",
    passwordRules: [
      (value) => {
        if (!/^.+$/.test(value)) return "Campo Obrigatório";
        if (!/^.+$/.test(value)) return "Insira sua Senha.";
        return true;
      },
    ],
    isFormValid: true,
  }),
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      if (!this.FormValid) {
        return;
      }
    },

    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        const { data } = await this.login(payload);
        const { access_token } = data;
        setupPrivateApi(access_token, access_token);
        localStorage.setItem("access_token", access_token);
        this.$emit("snackbar", "Login efetuado com sucesso!");
        this.$router.push("/inicial");
      } catch (err) {
        this.$emit(
          "snackbar",
          "Algo deu errado. Pedimos desculpas pelo inconveniente!"
        );
      }
    },
  },
};
</script>
