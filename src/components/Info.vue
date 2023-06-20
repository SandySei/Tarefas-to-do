<template>
  <div>
    <v-dialog class="d-flex justify-center" v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn
          class="bg-grey-darken-4"
          v-bind="props"
          density="compact"
          icon="mdi mdi-information"
          size="x-large"
        ></v-btn>
      </template>

      <v-card class="text-center w-50 align-self-center">
        <a
          class="text-grey mt-4 text-h4 text-decoration-none"
          href="https://br.hubspot.com/blog/marketing/instagram-aesthetic#:~:text=Aesthetic%2C%20em%20uma%20tradu%C3%A7%C3%A3o%20livre,para%20as%20%C3%A1reas%20dos%20neg%C3%B3cios."
          target="_blank"
        >
          O que é o termo Aesthetic?</a
        >
        <v-card-text>
          Aesthetic, em uma tradução livre, seria estética.<br />
          Mas o termo se refere a uma postura de vida, criada pela geração Z.
          <br /><br />
          É um modo de expressão próprio que ganhou vida no mundo da moda e está
          se expandindo para as áreas dos negócios. Dentro desse âmbito, o
          aesthetic é uma forma de expressão que não tem padrões e permite a
          livre expressão, tanto pessoal, como artística.
        </v-card-text>
        <v-card-actions>
          <v-btn color="red-accent-4" block @click="dialog = false"
            >Fechar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
