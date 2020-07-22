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
  post: [
    {
      type: String,
      data: String,
      required: true
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