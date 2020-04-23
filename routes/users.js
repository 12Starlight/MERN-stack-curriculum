const express = require("express");
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login'); 


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.post('/register', (request, response) => {
  const { errors, isValid } = validateRegisterInput(request.body);

  if (!isValid) {
    return response.status(400).json(errors); 
  }

  User.findOne({ email: request.body.email })
    .then(user => {
      if (user) {
        // Use the validations to send the error
        errors.email = 'Email already exists';
        return response.status(400).json(errors);
      } else {
        const newUser = new User({
          name: request.body.name, 
          email: request.body.email,
          password: request.body.password
        })
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
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            res.json({ msg: 'Success'});
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