const express = require('express');
const db = require('../connection');
const _ = require('lodash');

const router = express.Router();

router.post('/', async (req, res) => {
  const formData = req.body;
  const { tags, ...contentData } = formData;

  try {
    const status = await db.queryAsync('INSERT INTO content SET ?', contentData);
    const results = await db.queryAsync('SELECT idcontent FROM content WHERE idcontent = ?', status.insertId);
    const contentSelectId = results[0].idcontent;
    if (tags) {
      const tagsValues = tags.map(tag => [contentSelectId, tag]);
      const [tagValues] = await Promise.all([
        db.queryAsync('INSERT INTO contentHasTag (contentId,tagId) VALUES ?', [tagsValues])
      ]);
      res.status(200).json({
        tagValues
      });
    }
    return contentData;
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      sql: err.sql
    });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM content WHERE idcontent= ?', id, (err, results) => {

    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }
    return res.status(200).json(results);

  });
});




router.get('/', (req, res) => {
  db.query(`SELECT *, tagName 
  FROM content 
  JOIN contentHasTag ON contentHasTag.contentId = content.idcontent 
  JOIN tag ON idtag = tagId`, (err, results) => {
      const dedup = (items) => items.reduce((carry, current) => {
        const existing = carry.find(item => item.idcontent === current.idcontent);
        if (!existing) {
          current.tagsNames = [current.tagName]
          return carry.concat(current);
        }
        existing.tagsNames = existing.tagsNames.concat(current.tagName)
        return carry
      }, []);

      const dedupContent = dedup(results);
      if (err) {
        return res.status(500).json({
          error: err.message,
          sql: err.sql
        });
      }
      return res.status(200).json(dedupContent);

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