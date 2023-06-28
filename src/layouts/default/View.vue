<template>
    <v-main class="d-flex justify-center align-center ma-3">
      <transition name="slide-x-transition" mode="out-in">
        <router-view
          @teste="created = true"
          :created="created"
          :resetCreated="resetCreated"
        />
      </transition>
    </v-main>
  </template>
  
  <script>
  export default {
    data() {
      return {
        created: false,
      };
    },
    methods: {
      resetCreated() {
        this.created = false;
      },
    },
  };
