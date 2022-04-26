<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>

<script>
export default {
  name: "DefaultLayout",
  head: {
    title: "Login",
  },
};
</script>
