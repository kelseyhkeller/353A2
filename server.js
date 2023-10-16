const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/posting.html');
});

// Define a route for the postmessage endpoint
app.post('/postmessage', (req, res) => {
  const { topic, data } = req.body;
  const timestamp = new Date().toLocaleString();
  const message = `Topic: ${topic}, Data: ${data}, Timestamp: ${timestamp}\n`;

 // Append the message to the 'posts.txt' file
  fs.appendFile('posts.txt', message, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error posting message.');
    } else {
      res.status(200).send('Message posted.');
    }
  });
});


// Route to get existing posts
app.get('/getposts', (req, res) => {
  fs.readFile('posts.txt', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error while reading posts.');
      } else {
          // Split posts into an array and filter out empty lines
          const posts = data.split('\n').filter((post) => post.trim() !== '');
          res.status(200).json(posts);
      }
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

