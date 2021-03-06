const router = require('express').Router()
const commentController = require('../controllers/commentController')
const auth = require('../middleware/authMiddleware');

router.post('/comment', auth, commentController.createComment);

router.patch('/comment/:id', auth, commentController.updateComment);

router.patch('/comment/:id/like', auth, commentController.likeComment);

router.patch('/comment/:id/unlike', auth, commentController.unLikeComment);

module.exports = router;