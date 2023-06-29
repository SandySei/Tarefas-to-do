<template>
  <v-card-text
    class="animate__animated animate__flipInX d-flex justify-center flex-direction:column align-self-center"
  >
    <v-form fast-fail @submit.prevent v-model="isFormValid" class="w-50">
      <v-card-title class="pb-3 text-h4 text-grey">
        Seja Bem Vindo!
      </v-card-title>
      <v-text-field
        v-model="username"
        label="Nome de Usuário "
        :rules="userRules"
      ></v-text-field>

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

      <v-text-field
        v-model="confirmPassword"
        label="Confirme sua Senha"
        :type="showPassword ? 'text' : 'password'"
        :rules="[isPasswordMatch]"
      ></v-text-field>

      <v-checkbox
        v-model="showPassword"
        label="Ver senhas"
        color="grey"
      ></v-checkbox>

      <v-btn
        :disabled="!isFormValid"
        color="grey-darken-2"
        type="submit"
        block
        class="mt-2"
        @click="handleSubmit"
        >Cadastrar</v-btn
      >
    </v-form>
  </v-card-text>
</template>

<script>
/* import required from "@/utils/validation/required";
 */ import { authApiMixin } from "@/api/auth";

export default {
  mixins: [authApiMixin],
  data: () => ({
    username: "",
    userRules: [
      (value) => {
        if (!/^.+$/.test(value)) return "Campo Obrigatório";
        if (/.*[A-Z]/.test(value))
          return "O nome de usuário deve ser em letras minúsculas.";
        if (/.*[0-9]/.test(value)) return "O nome não deve ter números.";
        if (/.*[*!#@().$%&]/.test(value))
          return "O nome não deve conter caracteres.";
        if (/\s/.test(value)) return "O nome não deve ter espaços.";
        return true;
      },
    ],
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
        //regex: possui número? Uma minúscula? Uma maiúscula?Possui *? Pelo menos 8 caracteres

        if (!/^.+$/.test(value)) return "Campo Obrigatório";

        if (!/.*[0-9]/.test(value)) {
          return "A senha precisa de um número.";
        }
        if (!/.*[a-z]/.test(value)) {
          return "A senha precisa de pelo menos uma letra minúscula.";
        }
        if (!/.*[A-Z]/.test(value)) {
          return "A senha precisa de pelo menos uma letra maiúscula.";
        }
        if (!/.*[*!#@().$%&]/.test(value)) {
          return "A senha precisa de pelo menos um caractere especial.";
        }
        if (!/^[a-zA-Z0-9*!#@().$%&]{8,}$/.test(value)) {
          return "Sua senha precisa ter pelo menos 8 caracteres.";
        }
        return true;
      },
    ],
    confirmPassword: "",
    isFormValid: true,
  }),

  methods: {
    handleSubmit(event) {
      event.preventDefault();
      if (!this.FormValid) {
        return;
      }
    },
    isPasswordMatch(value) {
      return value === this.password || "As senhas são diferentes.";
    },

    async handleSubmit() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      try {
        await this.register(payload);
        this.$emit("snackbar", "Usuário Criado com sucesso!");
        this.$router.push("/");
      } catch (err) {
        const status = err.response.status;
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
