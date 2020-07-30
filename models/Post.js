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
      postType: String,
      content: String
    }
  ],  
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('post', PostSchema);