const app = require('express')();
const bodyParse = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const routes = require('./routes');

let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
            comments: [
                { text: 'ES6 is going to replace ES5' }
            ]
        }
    ]
}

app.use(bodyParse.json());
app.use(logger('dev'));
app.use(errorHandler());
app.use((req, res, next) => {
    req.store = store;
    next();
})

app.get('/posts', routes.posts.getPosts);
app.post('/posts', routes.posts.addPosts);
app.put('/posts/:postId', routes.posts.updatePost);
app.delete('/posts/:postId', routes.posts.deletePost);

app.get('/posts/:postId/comments', routes.comments.getComments);
app.post('/posts/:postId/comments', routes.comments.addComments);
app.put('/posts/:postId/comments/:commentId', routes.comments.updateComments);
app.delete('/posts/:postId/comments/:commentId', routes.comments.removeComments);

app.listen(3000, () => console.log('server is running...'));