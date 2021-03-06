const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const Tweet = require('../../models/Tweet');


const validateTweetInput = require('../../validation/tweets')
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login'); 


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})

router.post('/',
  passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { isValid, errors } = validateTweetInput(req.body); 

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newTweet = new Tweet({
        user: req.user.id,
        text: req.body.text
      });
    }
)

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Use the validations to send the error
        errors.handle = 'User already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error; 
            newUser.password = hash;
            newUser
              .save() 
              .then(user => {
                const payload = { id: user.id, handle: user.handle };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (error, token) => {
                  res.json({
                    success: true,
                    token: 'bearer ' + token
                  });
                });
                
              })
              .catch(error => console.log(error));
          })
        })
        // newUser.save().then(user => res.send(user)).catch(err => res.send(err)); 
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        // Use the validations to send the error
        errors.handle = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, handle: user.handle, email: user.email };

            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (error, token) => {
              res.json({ 
                success: true,
                token: 'Bearer ' + token
              });
            });
          } else {
            // And here:
            errors.password = 'Incorrect password'
            return res.status(400).json(errors);
          }
        })
    })
})

// Why will this not work

module.exports = router;   