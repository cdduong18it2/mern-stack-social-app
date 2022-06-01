const router = require("express").Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/authMiddleware");


router.route('/posts')
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts)

router.route('/post/:id')
    .patch(auth, postController.updatePost)

router.patch('/post/:id/like', auth, postController.likePost)
module.exports = router;

