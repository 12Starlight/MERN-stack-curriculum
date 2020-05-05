const express = require("express");
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');
require('../../config/passport')(passport);

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

const Validator = require('validator');
const validText = require('../../validation/valid-text')


// router.get("/test", (req, res) => res.json({ msg: "This is the tweets route" }));

router.get('/', (req, res) => {
  Tweet.find()
    .sort({ date: - 1 })
    .then(tweets => res.json(tweets))
    .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
});

router.get('/user/:user_id', (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then(tweets => res.json(tweets))
    .catch(err => {
      res.status(404).json({ notweetsfound: 'No tweets found from that user' });
    })
});

router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id) 
    .then(tweet => res.json(tweet))
    .catch(err => {
      res.status(404).json({ notweetsfound: 'No tweet found with that ID' });
    })
}); 

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { isValid, errors } = validateTweetInput(req.body);

    if(!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      user: req.user.id,
      text: req.body.text
    });

    newTweet.save().then(tweet => res.json(tweet));
  }
);


module.exports = function validateTweetInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 5, max: 140 })) {
    errors.text = 'Tweet must be between 5 and 140 charaters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};


module.exports = router; 