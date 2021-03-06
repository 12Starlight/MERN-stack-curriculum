const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
// require('./config/passport')(passport);
const path = require('path');

// const db = require('./config/keys').mongoURI; 
const db = process.env.MONGO_URI
const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');
const User = require('./models/User');
const bodyParser = require('body-parser');


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Express Router 
app.use('/api/users', users);
app.use('/api/tweets', tweets);

app.use(passport.initialize());

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
} else {
  app.get('/', (req, res) => {
    // debugger; 
    // console.log(res);
    const user = new User({
      handle: 'jim',
      email: 'jim@gmail.com',
      password: '123456'
    })
    user.save();
    res.send('Hello World!');
  }); 
}




