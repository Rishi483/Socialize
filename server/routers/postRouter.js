const router=require('express').Router();
const {createPostController,likeAndUnlikePost,updatePostController,deletePost}=require('../controllers/postsController');
const requireUser=require('../middlewares/requireUser');

router.post('/',requireUser,createPostController);
router.post('/like',requireUser,likeAndUnlikePost);
router.put('/updatePost',requireUser,updatePostController);
router.delete('/deletePost',requireUser,deletePost);

module.exports=router;