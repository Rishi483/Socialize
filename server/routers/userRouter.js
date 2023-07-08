const requireUser = require('../middlewares/requireUser');
const {followOrUnfollowUser,getPostsOfFollowing, getMyPosts, getUserPosts,getUserProfile, deleteMyProfile,getMyInfo,updateMyProfile} =require('../controllers/userController');
const router=require('express').Router();

router.post('/follow',requireUser,followOrUnfollowUser);
router.post('/getFeedData',requireUser,getPostsOfFollowing);
router.get('/getMyPosts',requireUser,getMyPosts);
router.get('/getUserPosts',requireUser,getUserPosts);
router.get('/getMyInfo',requireUser,getMyInfo);
router.delete('/',requireUser,deleteMyProfile);
router.put('/',requireUser,updateMyProfile);
router.post('/getUserProfile',requireUser,getUserProfile);

module.exports=router;