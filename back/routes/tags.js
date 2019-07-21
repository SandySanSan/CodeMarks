const express = require('express');
const db = require('../connection');

const router = express.Router();


router.post('/', (req, res) => {
  const formData = req.body;
  db.query('INSERT INTO tag SET ?', formData, (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
        sql: err.sql
      });
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
    return res.status(200).json(results);
  })
})

router.get('/:tag', (req, res) => {
  const tagSelect = req.params.tag
  db.query(`SELECT *, tagName FROM content 
  JOIN contentHasTag ON contentHasTag.contentId = content.idcontent 
  JOIN tag ON idtag = tagId 
  WHERE tagName LIKE ?
  ORDER BY dateCreation DESC`, tagSelect, (err, results) => {

      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql
        });
      }
      return res.status(200).json(results);

    });
});

module.exports = router;