<template>
  <section class="login-container">
    <v-card class="login-card mx-auto">
      <v-card-title class="justify-center"> Login</v-card-title>

      <v-form ref="loginForm" v-model="valid">
        <v-text-field
          v-model="loginData.username"
          label="E-mail"
          class="px-5"
          placeholder=" "
          type="email"
          :rules="emailRules"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="loginData.password"
          label="password"
          :rules="passwordRules"
          type="password"
          placeholder=" "
          class="px-5"
          required
          outlined
        ></v-text-field>
        <v-row justify="center" align="center">
          <p v-show="loginError" class="login-error-p">
            Unable to log in with provided credentials.
          </p>
        </v-row>
        <v-row justify="center" align="center">
          <v-btn class="mt-5 login-btn" color="primary" @click="login">
            Login
          </v-btn>
          <v-btn class="mt-5 login-btn" to="/register"> Signup </v-btn>
        </v-row>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<style scoped>
.login-error-p {
  color: #d8000c;
}
.login-container {
  margin: 10vh;
}

.login-btn {
  width: 328px;
}

.login-card {
  width: 360px;
  height: 400px;
}
.v-text-field input {
  width: 328px;
}
</style>

<script>
export default {
  // setup() {
  //   const loginData = reactive({
  //     password: "",
  //     username: "",
  //   });
  //   const valid = ref(false);
  //   const login = async () => {
  //     console.log("login was clicked");
  //     try {
  //       await auth.loginWith("local", {
  //         data: {
  //           username: loginData.username,
  //           password: loginData.password,
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const signUp = () => {
  //     router.redirect("/register");
  //   };
  // const passwordRules = [
  //   (v) => !!v || "password is required",
  //   (v) => (v) =>
  //     (v && v.length >= 10) || "Name must be greater than 10 characters",
  // ];
  //   const emailRules = [
  //     (v) => !!v || "E-mail is required",
  //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  //   ];
  //   return {
  //     loginData,
  //     login,
  //     valid,
  //     signUp,
  //     emailRules,
  //     passwordRules,
  //     loginWithNuxt,
  //   };
  // },
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },

      text: "Form is not valid please check form.",
      timeout: 2000,
      snackbar: false,
      loginError: false,
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "password is required",
        (v) =>
          (v && v.length >= 10) || "Name must be greater than 10 characters",
      ],
    };
  },
  methods: {
    async login() {
      console.log("login was clicked");
      if (this.$refs.loginForm.validate()) {
        console.log("form is valid");
        try {
          await this.$auth.loginWith("local", {
            data: this.loginData,
          });
          console.log(this.$auth.user);
          if (this.$auth.user.role === 1) {
            this.$router.replace("/admin");
          } else {
            this.$router.replace("/");
          }
        } catch (error) {
          this.loginError = true;
          console.log(error);
        }
      } else {
        this.snackbar = true;
        console.log("form is valid");
      }
    },
  },
  layout: "auth",
};
</script>