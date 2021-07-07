const express = require('express');
const Posts = require('./db.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "The posts information could not be retrieved."});
  }
});


router.get('/:id', async (req, res) => {
  try {
    const posts = await Posts.findById(req.params.id);

    if (posts[0]) {
      res.status(200).json(posts[0]);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Req.body', req.body);
    if (req.body.title && req.body.contents) {
      const post = await Posts.insert(req.body);
      const newPost = await Posts.findById(post.id);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    console.log(post[0]);
    if (post[0]) {
      const removedPost = await Posts.remove(post.id);
      res.status(200).json({ message: "Post was removed" })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
})




module.exports = router;
