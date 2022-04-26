<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
    <v-card>
      <v-progress-linear
        v-show="sendingRequest"
        indeterminate
        height="5"
        color="cyan"
      ></v-progress-linear>
      <v-card-title class="justify-center"> Add post </v-card-title>
      <v-form ref="postForm" v-model="valid">
        <v-file-input
          v-model="editedPost.files"
          class="px-5"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
        ></v-file-input>

        <v-img
          :src="url"
          v-show="url"
          width="300"
          height="150"
          class="px-5 ml-12"
        />

        <v-textarea
          outlined
          class="px-5 mt-5"
          label="Post Content"
          v-model="editedPost.content"
          required
        ></v-textarea>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="consoleEditPost"> log </v-btn>
        <v-btn color="primary" text @click="closeDialog"> close </v-btn>

        <v-btn color="primary" text @click="addPost"> add Post </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            files: "",
            content: "",
          },
      sendingRequest: false,
      valid: false,
      dialog: true,
    };
  },

  computed: {
    url() {
      if (
        !this.editedPost &&
        !this.editedPost.files &&
        !this.editedPost.imageUrl
      )
        return;
      if (this.editedPost.imageUrl) return this.editedPost.imageUrl;
      console.log("creating url");
      if (this.editedPost.files)
        return URL.createObjectURL(this.editedPost.files);
    },
  },
  methods: {
    // addPost() {
    //   console.log(this.content);
    //   console.log(this.files);
    //   if (this.$refs.postForm.validate()) {
    //     this.sendingRequest = true;
    //     let formData = new FormData();
    //     formData.append("postImage", this.files);
    //     formData.append("content", this.content);
    //     console.log(formData);
    //     this.$axios
    //       .post("post/create", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then((response) => {
    //         console.log("Success!");
    //         console.log({ response });
    //         if (response.status === 201) {
    //           this.snackbarText = "New post was created";
    //           this.sendingRequest = false;
    //           this.dialog = false;
    //           this.snackbar = true;
    //         }
    //       })
    //       .catch((error) => {
    //         this.snackbarText = "somethings goes wrong please try again!";
    //         this.sendingRequest = false;
    //         this.dialog = false;
    //         this.snackbar = true;
    //         console.log({ error });
    //       });
    //   } else {
    //     this.snackbar = true;
    //   }
    // },
    consoleEditPost() {
      console.log(this.editedPost);
    },
    closeDialog() {
      console.log("closing dialog");
      this.$emit("toggleDialog");
    },

    addPost() {
      this.sendingRequest = true;
      console.log(this.editedPost.content);
      console.log(this.editedPost.files);
      if (this.$refs.postForm.validate()) {
        let formData = new FormData();
        formData.append("postImage", this.editedPost.files);
        formData.append("content", this.editedPost.content);
        this.$store.dispatch("adminPost/addPost", formData).then((_) => {
          this.$emit("toggleDialog");
        });
      }
      this.sendingRequest = false;
    },
  },
};
</script>
