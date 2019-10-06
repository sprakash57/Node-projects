module.exports = {
    getComments(req, res) {
        const id = req.params.postId
        res.status(200).send(req.store.posts[id].comments)
    },
    addComments(req, res) {
        const postId = req.params.postId;
        const id = req.store.posts[postId].comments.length;
        req.store.posts[postId].comments.push(req.body);
        res.status(201).send({ id });
    },
    updateComments(req, res) {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        req.store.posts[postId].comments[commentId] = req.body;
        res.status(200).send(req.store.posts[postId]);
    },
    removeComments(req, res) {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const deletedComment = req.store.posts[postId].comments[commentId];
        req.store.posts[postId].comments.splice(commentId, 1);
        res.status(200).send({ status: 'Comment deleted successfully', deletedComment })
    }
}