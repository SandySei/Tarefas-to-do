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

      <v-card class="text-center w-75 align-self-center">
        <p class="text-cyan mt-4 text-h4">Pra que é o "Tarefas"?</p>
        <v-card-text>
          Um site simples para checklists de atividades é uma ferramenta online
          projetada para ajudar as pessoas a organizarem suas tarefas de forma
          eficiente.
          <br />
          Ele fornece uma interface intuitiva e funcionalidades básicas para
          criar, gerenciar e agrupar listas de atividades com temas específicos.
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
