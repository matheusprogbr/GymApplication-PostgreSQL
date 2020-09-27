const { Pool } = require('pg');

module.exports = new Pool({
  user:'postgres',
  password:'Snoopy2010',
  host:'localhost',
  port:'5432',
  database:'gym'
});