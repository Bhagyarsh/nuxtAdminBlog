<template>
  <section class="signup-container">
    <v-card class="signup-card mx-auto">
      <v-card-title class="justify-center"> Sign up</v-card-title>

      <v-form ref="signupForm" v-model="valid">
        <v-text-field
          v-model="signupData.name"
          label="Name"
          class="px-5"
          placeholder=" "
          type="text"
          :rules="nameRules"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="signupData.email"
          label="E-mail"
          class="px-5"
          placeholder=" "
          type="email"
          :rules="emailRules"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="signupData.password"
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
          <v-btn class="mt-5 signup-btn" color="primary" @click="signup">
            Signup
          </v-btn>
        </v-row>
        <v-row justify="center" align="center">
          <v-btn class="mt-5 signup-btn" to="/login"> Login </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </section>
</template>

<style scoped>
.signup-error-p {
  color: #d8000c;
}
.signup-container {
  margin: 10vh;
}

.signup-btn {
  width: 328px;
}

.signup-card {
  width: 360px;
  height: 440px;
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
      signupData: {
        email: "",
        name: "",
        password: "",
      },
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
      nameRules: [(v) => !!v || "Name is required"],
    };
  },
  methods: {
    async signup() {
      console.log("signup was clicked");
      console.log(this.signupData);
  
      this.$axios
        .post("user/signup", this.signupData)
        .then(async (response) => {
          console.log(response);
          if (response.status == 201) {
            try {
              await this.$auth.loginWith("local", {
                data: {
                  username: this.signupData.email,
                  password: this.signupData.password,
                },
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  layout: "auth",
};
</script>