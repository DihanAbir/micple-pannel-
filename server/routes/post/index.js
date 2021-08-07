const router = require('express').Router();

const { Post } = require('../../../../database/posts');

router.put('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { rejected } = req.body;
    await Post.findByIdAndUpdate(postId, { $set: { rejected } });
    res.status(200).json({ message: 'Post has been rejected.' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'No post found.' });
  }
});

module.exports = router;
