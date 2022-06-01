const Posts = require("../models/postModel");


const postController = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body;
            
            if(images.length === 0) return res.status(400).json({msg : "Please add your photo."})

            const newPost = new Posts({
                content, images, user: req.user._id
            });
            await newPost.save()
            res.json({
                msg: "Create Post",
                newPost
            })
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Posts.find({
                user: [...req.user.following, req.user._id]
            }).sort('-createdAt')
            .populate("user likes", "avatar username fullname")
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "-password"
                }
            })
          
            

            res.json({
                msg: "Success!",
                result: posts.length,
                posts
            })
        } catch (err) {
            return res.status(500).json({msg : err.message})
        }
    },
    updatePost: async (req, res) => {
        try {
            const { content, images } = req.body;

            const post = await Posts.findOneAndUpdate({_id : req.params.id}, {
                content, images
            }).populate("user likes", "avatar username fullname");
            res.json({
                msg: "Updated Post!",
                newPost: {
                    ...post._doc,
                    content, images
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try {

           await Posts.findOneAndUpdate({_id: req.params.id}, {
               $push: {likes: req.user._id}
           }, {new: true})

           res.json({msg: 'Liked Post'})

        } catch (err) {
            return res.status(500).json({msg: err.message})  
        }
    },
    
    
}
module.exports = postController;