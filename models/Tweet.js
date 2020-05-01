const mongoose = require('mongoose');
const Schema = mongooese.Schema;


const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = Tweet = mongoose.model('tweet', TweetSchema);