const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId
  // },
  heading: {
    type: String,
    required: true
  },
  car: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  post: [
    {
      postType: String,
      content: String
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('post', PostSchema);