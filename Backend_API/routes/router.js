const { Router } = require('express');
const { getAllPosts, getPostById, postComment, getUserByEmail, postNewAdmin, postNewPost, putUpdatePost, deletePostById, deleteCommentById } = require('../db/queries');
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {authenticateToken} = require('../db/tokenAuth');
const passport = require('passport');

router.get('/', async (req, res) => {
    //console.log('working get')
    const posts = await getAllPosts();
    res.json({
        title: "Blog",
        posts: posts
    });
})

router.get('/post/:id', async (req, res) => {
    const id = req.params.id;
    const post = await getPostById(id);
    res.json({
        post: post
    });
})

router.post('/post-comment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment, commenter } = req.body;
    console.log(commenter);
    await postComment(id, comment, commenter)
    res.redirect(`post/${id}`);
})

router.post('/admin-signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (email === user.email) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) { //the password compare would normally be done using bcrypt.
            const opts = {
                expiresIn: 30 * 60
            }
            const secret = process.env.SECRET_KEY //normally stored in process.env.secret
            const token = jwt.sign({ email, userId: user.id }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token,
                id: user.id
            });
        }
    }
    return res.status(401).json({ message: "Auth Failed" });
});

router.post('/admin-signup', async (req, res) => {
    const { name, email, password, secret } = req.body;
    if (secret !== process.env.SECRET_KEY) return res.status(401).json({ message: "Invalid Secret Key" });

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await postNewAdmin(name, email, hashedPassword);
        res.status(200).json({message: 'Created Admin'})    
    } catch (error) {
        console.log(error.message);
    }
})

router.post('/admin-create-post', authenticateToken, async (req, res) => {
    const { title, content, published } = req.body;
    const authorId = req.user.userId;
    console.log('userid:',authorId);
    try {
        await postNewPost(title, content, published, authorId);
        res.status(201).json({ message: 'Post created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/update-post', authenticateToken, async (req, res) => {
    const { id, title, content, published } = req.body;
    console.log(req.body.title)
    try {
        await putUpdatePost(id, title, content, published);
        res.status(201).json({ message: 'Post updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/delete-post/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    console.log('id: ', id);
    try {
        await deletePostById(id);
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        console.log(error.message);
    }
});

router.delete('/delete-comment/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCommentById(id);
        console.log("Comment deleted");
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router;