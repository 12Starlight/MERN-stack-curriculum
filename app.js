const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./config/keys').mongoURI; 
const users = require('./routes/users');
const tweets = require('./routes/tweets');
const bodyParser = require('body-parser');


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));

app.get('/', (req, res) => {
  debugger; 
  // console.log(res);
  res.send('Hello World!');
}); 


// Express Router 
app.use('/api/users', users);
app.use('/api/tweets', tweets);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server is running on port ${port}`));




