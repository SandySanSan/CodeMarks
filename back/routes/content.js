const express = require('express');
const db = require('../connection');

const router = express.Router();

router.post('/', async (req, res) => {
  const formData = req.body;
  const { tags, ...contentData } = formData;
  console.log(formData)

  try {
    const status = await db.queryAsync('INSERT INTO content SET ?', contentData);
    const results = await db.queryAsync('SELECT idcontent FROM content WHERE idcontent = ?', status.insertId);
    const contentSelectId = results[0].idcontent;
    const tagsValues = tags.map(tag => [contentSelectId, tag]);

    const [tagValues] = await Promise.all([
      db.queryAsync('INSERT INTO contentHasTag (contentId,tagId) VALUES ?', [tagsValues])
    ]);
    res.status(200).json({
      tagValues
    });
    return contentData;
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      sql: err.sql
    });
  }
});



router.get('/', (req, res) => {
  db.query('SELECT *, tagName FROM content JOIN contentHasTag ON contentHasTag.contentId = content.idcontent JOIN tag ON idtag = tagId', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.status(200).json({
      results
    });
  });
});

router.delete('/:id', (req, res) => {
  const contentId = req.params.id;

  db.query('DELETE FROM content WHERE idcontent = ?', [contentId], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.json(results);
  });
});

module.exports = router;