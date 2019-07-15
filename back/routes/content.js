const express = require('express');
const db = require('../connection');

const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  db.query('INSERT INTO content SET ?', formData, (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.json(formData);

  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM content', (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.sendStatus(200);

  });
});

module.exports = router;