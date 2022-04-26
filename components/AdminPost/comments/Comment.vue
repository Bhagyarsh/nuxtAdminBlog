<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <p @click="getAllComments">{{ commentStatusText }}</p>
      </v-row>
    </v-container>

    <div class="text-center" v-if="viewComment && !loadedComment">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="viewComment && loadedComment">
      <div
        class="comment-list"
        v-for="comment in commentList"
        :key="comment.id"
      >
        <v-col>
          <p>{{ comment.username }}</p>

          <p>
            {{
              $dateFns.format(
                $dateFns.parseISO(comment.createdAt),
                "MM dd yyyy"
              )
            }}
          </p>
        </v-col>

        {{ comment.comment }}
        <v-divider></v-divider>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["postId"],
  methods: {
    toggleHideComments() {},
    getAllComments() {
      this.viewComment = !this.viewComment;
      console.log(this.postId);
      this.$axios
        .post("comment/allpost", {
          post_id: this.postId,
        })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            this.loadedComment = !this.loadedComment;
            this.commentList = data.data;
            this.commentStatusText = "hide comment";
          }
        });
    },
  },
  data() {
    return {
      commentStatusText: "View Comment",
      loadedComment: false,
      viewComment: false,
      commentList: [],
    };
  },
  // computed:{

  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];

  //   }
  // },
};
</script>
