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

router.get('/', (req, res) => {
  db.query('SELECT * FROM tag ORDER BY tagName ASC', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    console.log(results)
    return res.status(200).json(results);
  })
})



module.exports = router;