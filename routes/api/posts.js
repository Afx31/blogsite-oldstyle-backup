const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/add-post', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    try {
      // Create new Post object from the model Post
      const newPost = newPost({
        heading: req.body.text,
        car: req.body.car,
        // post[]
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error');
    }
  }
);


// Is this actually needed? Need get all of specific car
// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// **
// Get ALL posts for specific car
// 

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    };

    res.json(post);    
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    };

    res.status(500).send('Server Error');
  }
});


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