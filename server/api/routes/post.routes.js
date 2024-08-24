const {Router} = require('express');

// middlewares
// private route
const {privateRoute} = require('../middlewares/auth.middleware');

// controllers
// post controllers
const {
    getAllPosts,
    addNewPost,
    updatePost,
    deletePost,
} = require('../controllers/post.controllers')


// router
const router = Router();

// get all post
router.get('/get-all-posts',getAllPosts)

// add new post
router.post('/new-post',privateRoute,addNewPost)

// update single post
router.put('/update-post/:_id',privateRoute,updatePost)

// delete post
router.delete('/delete-post/:_id',privateRoute,deletePost)


// exports
module.exports = router;