const express = require('express');

const router = express.Router();

router.get('/user', (req, res) => {
  res.json({
    data: 'user',
  });
});

module.exports = router;
