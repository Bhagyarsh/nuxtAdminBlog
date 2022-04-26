<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="5" md="5">
        <v-card>
          <v-card-title class="justify-center">
            Welcome {{ $auth.user.name }}</v-card-title
          >
          <v-row justify="center" align="center">
            <v-btn
              @click="toggleDialog"
              class="justify-center ma-5"
              color="primary"
              >Add New post</v-btn
            >
          </v-row>
        </v-card>
      </v-col>
    
      <PostDialog v-if="dialog" :dialog="dialog" @toggleDialog="toggleDialog"/>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
    <div class="mt-9"></div>
    <v-row justify="center" align="center">
       <v-col cols="12" sm="5" md="5">
        <PostList />
      </v-col>
    </v-row>
    <!-- {{ loadedPosts }} -->
  </div>
</template>

<style>
</style>

<script>

import PostDialog from "@/components/AdminPost/PostDialog";
import PostList from "@/components/AdminPost/PostList";
export default {
  components: {
    PostDialog,
    PostList
  },
  middleware: ["auth-admin"],
  data() {
    return {
      dialog: false,
      snackbarText: "",
      snackbar: false,
      text: "",
      timeout: 2000,
    };
  },
  computed: {
  
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>