const Post = require('../models/Post');

//GET all post
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate('author', 'name').select('content createdAt');
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts },
        });
    } catch (error) {
        res.json(error);
    }
};

//POST create one post
exports.createOnePost = async (req, res, next) => {
    try {
        const { userId } = req.user;

        const post = await Post.create({ ...req.body, author: userId });
        res.status(200).json({
            status: 'success',
            data: { post },
        });
    } catch (error) {
        next(error);
    }
};

//PUT update one post
exports.updateOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Post.findByIdAndUpdate(postId, { ...req.body }, { new: true, runValidator: true });
        res.status(200).json({
            status: 'success',
            data: { post },
        });
    } catch (error) {
        next(error);
    }
};

//DELETE delete one post
exports.deleteOnePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        res.status(200).json({
            status: 'success',
            massage: 'Post has been deleted',
        });
    } catch (error) {
        next(error);
    }
};
