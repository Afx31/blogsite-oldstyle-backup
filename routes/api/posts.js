const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/add-post', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  try {
    // Create new Post object from the model Post
    const newPost = new Post({
      heading: req.body.heading,
      car: req.body.car,
      thumbnail: req.body.thumbnail,
      description: req.body.description,
      post: req.body.formData,
    });
    
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/posts/postsByCar
// @desc    Get all posts
// @access  Public
router.get('/postsByCar/:car', async (req, res) => {
  try {
    const posts = await Post.find({ "car": req.params.car }).sort({ "date": -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});


// @route   GET api/getPostBio
// @desc    Get latest post 10 post's with their 'bio' info
// @access  Public
router.get('/getPostBio', async (req, res) => {
  try {
    const posts = await Post.find().sort({'_id': -1}).limit(10);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});


// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/getPostById/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});


// @route   GET api/firstPostId/:car
// @desc    Get latest post id for specific car
// @access  Private
router.get('/firstPostId/:car', async (req, res) => {
  try {
    const postId = await Post.find({ "car": req.params.car }).sort({ '_id': -1 }).limit(1);
    res.json(postId);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  };
});


// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/addComment/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    // Create new Post object from the model Post
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment on a post
// @access  Private
router.delete('/deleteComment/:id/:comment_id', auth, async (req, res) => {
  try {
    // Get the post by ID
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    // Splice out of array
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;