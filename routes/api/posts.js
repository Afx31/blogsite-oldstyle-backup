const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/add-post', async (req, res) => {
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






// Is this actually needed? Need get all of specific car
// @route   GET api/posts
// @desc    Get all posts
// @access  Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json('Server Error');
//   }
// });

// **
// Get ALL posts for specific car
//



// Create a post for specific car
// Get a post by id for specific car

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

// @route   PUT api/posts/:id
// @desc    Like a post
// @access  Private

// @route   PUT api/posts/:id
// @desc    Unlike a post
// @access  Private

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment on a post
// @access  Private
module.exports = router;
