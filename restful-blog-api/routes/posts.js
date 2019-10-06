module.exports = {
    getPosts(req, res) {
        res.status(200).send(req.store.posts);
    },
    addPosts(req, res) {
        const id = req.store.posts.length;
        req.store.posts.push(req.body);
        res.status(201).send({ id });
    },
    updatePost(req, res) {
        const id = req.params.postId;
        req.store.posts[id] = req.body;
        res.status(200).send(req.store.posts[id]);
    },
    deletePost(req, res) {
        const id = req.params.postId;
        const deletedPost = req.store.posts[id];
        req.store.posts.splice(id, 1);
        res.status(200).send({ msg: 'Post deleted successfully', deletedPost });
    }
};