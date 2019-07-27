const express = require('express');
const server = express();
const db = require("./data/db.js");
server.use(express.json());

server.listen(4000, () => {
  console.log("Server listening on port 4000.");
});

server.get('/', (req, res) => {
  res.send(
    "<h1>Welcome to the API</h1>"
  )
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    })
})
