

export const state = () => ({
    loadedAdminPosts: [],
});
export const mutations = {
    likePost(state, post, id) {
        console.log(state)
    },
    setPosts(state, posts) {
        state.loadedAdminPosts = posts;
    },
    addPost(state, post) {
        state.loadedAdminPosts.unshift(post);
    },
    editPost(state, editedPost) {
        let postIndex = state.loadedAdminPosts.findIndex(
            post => post.id === editedPost.id
        );
        console.log(editedPost)
        console.log("final edit")
        state.loadedAdminPosts[postIndex] = editedPost
        // Object.assign(state.loadedAdminPosts[postIndex], JSON.parse(JSON.stringify(editedPost)))
    },
    deletePost(state, deletePost) {
        console.log(deletePost.id)
        const postList = state.loadedAdminPosts.filter(post => {
            return deletePost.id !== post.id;
        });
        console.log(postList)

        state.loadedAdminPosts = postList

    }
}
export const getters = {
    loadedPosts(state) {
        return state.loadedAdminPosts;
    },
}
export const actions = {
    nuxtServerInit(vuexContext, context) {
        // console.log("================================")
        try {
            return context.app.$axios
                .get("post/admin/posts")
                .then(data => {
                    // console.log("===============got data=================")
                    if (data.status === 200) {
                        console.log(data.data.posts);
                        vuexContext.commit("adminPost/setPosts", data.data.posts);
                    }

                })
        } catch (error) {
            return
        }

        // .catch(e => {
        //     console.log("===========got error =============")
        //     console.log(e)
        //     context.error(e)});
    },
    getAllPost(vuexContext) {
        return this.$axios
            .get("post/admin/posts")
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    vuexContext.commit("setPosts", data.data.adminPost.rows);
                }

            })
            .catch(e => context.error(e));
    },
    addPost(vuexContext, post) {
        return this.$axios
            .post("post/create", post).then(data => {
                console.log(data)
                const newPost = {
                    id: data.data.id,
                    imageUrl: data.data.imageUrl,
                    creator: data.data.creator,
                    content: data.data.content,
                    createdAt: data.data.createdAt,
                    user_liked: false
                }
                vuexContext.commit("addPost", newPost);
            })
            .catch(e => console.log(e));
    },
    editPost(vuexContext, editedPost) {
        return this.$axios
            .$put(
                "https://nuxt-blog.firebaseio.com/posts/" +
                editedPost.id +
                ".json?auth=" +

                editedPost
            )
            .then(res => {
                vuexContext.commit("editPost", editedPost);
            })
            .catch(e => console.log(e));
    },
    deletePost(vuexContext, post) {
        // return this.$axios.delete("post/" + post.id).then((res) => {
        //     if (res.status === 200) {
        //         console.log("post deleted")
        //         vuexContext.commit("deletePost", post);
        //     }
        // }).catch(e => console.log(e));
        return vuexContext.commit("deletePost", post);
    },
    setPosts(vuexContext, posts) {

        vuexContext.commit("adminPost/setPosts", posts);
    },
    likePost(vuexContext, post) {
        return this.$axios.post("post/like", {
            post_id: post.id
        }).then((res) => {
            if (res.status === 201) {
                console.log("post Liked")
                vuexContext.commit("likePost", post)
                // post.user_liked = !post.user_liked
                vuexContext.commit("editPost", {
                    content: post.content,
                    createdAt: post.createdAt,
                    creator: post.creator,
                    id: post.id,
                    imageUrl: post.imageUrl,
                    user_liked: !post.user_liked,
                })
            }
        }).catch(e => console.log(e));


    }
}

