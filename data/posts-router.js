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
    const post = await Posts.findById(req.params.id);
    console.log('Post is:', post[0]);

    if (post[0]) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
});


module.exports = router;
