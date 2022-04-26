<template>
  <div>
    <v-card class="mt-4">
      <v-row class="px-5">
        <v-col>
          <p>{{ post.creator }}</p>
          <!-- <p>{{ post.createdAt }}</p> -->
          <p>
            {{
              $dateFns.format($dateFns.parseISO(post.createdAt), "MM dd yyyy")
            }}
          </p>
        </v-col>
        <v-spacer></v-spacer>

        <v-menu left bottom class="ma-4 px-5">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="editPost(post)">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deletePost(post)">
              <v-list-item-title>delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-divider />

      <v-container class="px-5">
        <v-row>
          <p class="mt-2 px-5">{{ post.content }}</p>
        </v-row>
        <v-row align="center">
          <v-img
            class="px-18 my-2"
            :src="post.imageUrl"
            width="300"
            height="150"
          />
        </v-row>
      </v-container>

      <v-container>
        <v-row no-gutters style="flex-wrap: nowrap">
          <v-col cols="6">
            <v-btn block @click="likePost(post)">
              <v-icon class="mr-4" :color="like ? 'primary' : null">
                mdi-thumb-up</v-icon
              >
              like
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block @click="openPanel"
              ><v-icon class="mr-4"> mdi-message-text-outline</v-icon> comment
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-expansion-panels v-model="openedCommentPanel" class="mb-6">
        <v-expansion-panel :key="0">
          <v-expansion-panel-content>
            <div class="comment mt-5">
              <v-textarea
                autofocus
                outlined
                label="Post Content"
                v-model="comment"
                name="comment"
                required
              />
              <v-btn color="primary" @click="sendComment">Comment</v-btn>
            </div>
            <div class="view-comments">
              <Comment :postId="post.id" />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <div>
      <PostDialog v-if="dialog" :post="postdata" @toggleDialog="toggleDialog" />
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
import PostDialog from "@/components/AdminPost/PostDialog";
import Comment from "@/components/AdminPost/comments/Comment";
export default {
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  components: {
    PostDialog,
    Comment,
  },
  data() {
    return {
      comment: "",
      viewComment: false,
      openedCommentPanel: null,
      like: this.post.user_liked,
      dialog: false,
      viewAllComments: null,
    };
  },

  methods: {
    sendComment() {
      if (this.comment) {
        this.$axios
          .post("comment/create", {
            post_id: this.post.id,
            comment: this.comment,
          })
          .then((data) => {
            console.log(data);
          });
      }
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },

    deletePost(post) {
      this.$store.dispatch("adminPost/deletePost", post);
    },
    editPost(post) {
      this.postdata = post;
      this.dialog = !this.dialog;
    },
    openPanel() {
      console.log("tring to open panel");

      if (!this.openedCommentPanel && this.openedCommentPanel !== 0) {
        console.log("makeing 0 ");
        this.openedCommentPanel = 0;
      } else {
        console.log("makeing null ");
        this.openedCommentPanel = null;
      }
      console.log(this.openedCommentPanel);
    },
    likePost(post) {
      // loadedPosts[post]

      this.$store.dispatch("adminPost/likePost", post).then((_) => {
        this.like = !this.like;
      });
    },
  },
};
</script>
