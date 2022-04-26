<template>
  <!-- v-for="post in loadedAdminPosts" :key="post.id" -->
  <div>
    <card v-for="post in loadedAdminPosts" :key="post.id">
      <Post :post="post" />
    </card>
  </div>
</template>
<style>
</style>
<script>
import { mapState } from "vuex";
import Post from "@/components/AdminPost/Post";
export default {
  computed: {
    ...mapState("adminPost", ["loadedAdminPosts"]),
  },
  components: {
    Post,
  },
};
</script>
