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
    console.log(status)
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