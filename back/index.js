const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const contentRouter = require('./routes/content');
const tagsRouter = require('./routes/tags')

const app = express();
app.use(bodyParser.json());

app.use('/api/content', contentRouter);
app.use('/api/tags', tagsRouter);

app.listen(process.env.PORT || 5000);
