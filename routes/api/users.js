const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator/check");

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const userType = 'user';

    try {
      // ----- See if user exists -----
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [ { msg: 'Email is already in use' } ] });
      }

      // ----- Get users gravatar -----
      //s: String
      //r: Rating
      //d: Default
      //f: Force
      const avatar = gravatar.url(email, { 
        s: '200',
        r: 'pg',
        d: 'identicon',
        f: 'y'
      })

      // create user
      user = new User({
        name,
        email,
        avatar,
        password,
        userType
      });

      // ----- Encrypt password -----
      const salt = await bcrypt.genSalt(10);
      // creating the hash
      user.password = await bcrypt.hash(password, salt);
      // save user in db
      await user.save();

      // create payload
      const payload = {
        user: {
          id: user.id
        }
      }
      
      // token signing/sending back
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        });

    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST /api/users/editUser
// @desc    Edit the user 
// @access  Private
router.post(
  '/editUser',
  // [
  //   check("name", "Name is required").not().isEmpty(),
  //   check("email", "Please include a valid email").isEmail(),
  //   check("password", "Please enter a password with 6 or more characters")
  //     .isLength({ min: 6 }),
  // ],
  auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Pull everything out from the body
  const { name, email, currentPassword, newPassword } = req.body;

  try {
    // Look for a user match
    let findUser = await User.findOne({ _id: req.user.id });

    const userFields = {};
    userFields.name = name;
    userFields.email = email;

    // Match current password input with db hashed one
    const currPwdMatch = bcrypt.compareSync(currentPassword, findUser.password);
    if (!currPwdMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Old Password' }] });
    }

    if (currentPassword && newPassword) {      
      // ----- Encrypt password -----
      const salt = await bcrypt.genSalt(10);
      // Creating the hash
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      userFields.password = hashedPassword;
    }
    
    if (findUser) {
      findUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userFields },
        { new: true }
      );
      return res.json(findUser);
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


// @route   DELETE /api/users/deleteUser
// @desc    Delete the User
// @access  Private
router.delete('/deleteUser', auth, async (req, res) => {
  try {
    const posts = await Post.find({}, '_id');

    for (const postId of posts) {
      const post = await Post.findById(postId._id);
      const commentsArr = post.comments;

      for (let i = 0; i < commentsArr.length; i++) {
        if (commentsArr[i].user.toString() === req.user.id) {
          post.comments.splice(i, 1);
          i--;
        }
      }
      await post.save();
    }

    // Delete user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
