export const state = () => ({
    commentData: {
        postId: [],
        comments: [],
    }
});

export const mutations = {
    setComments(state, comment, id) {
        if(state.commentData.postId.find(id)){
            
        }
    },


}
export const actions = {
    sendComent(comments) {
        return this.$axios
            .post("post/admin/posts")
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    vuexContext.commit("setPosts", data.data.adminPost.rows);
                }

            })
            .catch(e => context.error(e));
    }
}