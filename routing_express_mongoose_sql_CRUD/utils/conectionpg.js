const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.USERDB,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
})

//postgres://gkngcqgn:w7DcftkSiVovwpG9nfRYCgOW8hcUguZI@queenie.db.elephantsql.com/gkngcqgn  

console.log(process.env.USERITO)

  module.exports = pool