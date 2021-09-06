const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: 'gkngcqgn',
  host: 'queenie.db.elephantsql.com',
  database: 	'gkngcqgn',
  password: 'w7DcftkSiVovwpG9nfRYCgOW8hcUguZI',
})

//postgres://gkngcqgn:w7DcftkSiVovwpG9nfRYCgOW8hcUguZI@queenie.db.elephantsql.com/gkngcqgn  

console.log(process.env.USERITO)

  module.exports = pool