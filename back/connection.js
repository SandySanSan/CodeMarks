const mysql = require('mysql');
const util = require('util');

const settings = require('./db-settings');

const connection = mysql.createConnection(settings);

connection.queryAsync = util.promisify(connection.query.bind(connection));
module.exports = connection;
