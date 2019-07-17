const express = require('express');
const db = require('../connection');

const router = express.Router();


router.post('/', (req, res) => {
  const formData = req.body;
  db.query('INSERT INTO tag SET ?', formData, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
})



module.exports = router;