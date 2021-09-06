const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = require('../utils/conectionpg')

/* const pool = new Pool({
  user: 'getit',
  host: 'localhost',
  database: 'demo',
  password: 'Ey!12345$',
  port: 5432,
})
 */

// CRUD
const entries = {
  // entry --> ["n1","c1","t1","pepe@gmail.com"]
  createEntry: async (data) => {
    const client = await pool.connect()
    let result;
    
    const { titulo, contenido, tematica, email } = data;
    try {
      let sql_query = "INSERT INTO entradas_blog( titulo, Contenido, Tematica,ID_autor) VALUES ($1, $2, $3,(SELECT ID_autor FROM Autores WHERE Email=$4))";
      result = await client.query(sql_query, [titulo, contenido, tematica, email]); // evita SQL Injection
      console.log(result);
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
    return result;
  },

  getAllEntries: async () => {
    const client = await pool.connect()
    let result;
    try {
      let sql_query = "SELECT * FROM entradas_blog";
      result = await client.query(sql_query); // evita SQL Injection
      console.log(result);

    } catch (err) {
      throw err;
    }  finally {
      client.release();
    }
    return result;
  },
  getEntriesByEmail: async (email) => {
    const client = await pool.connect()
    let result;
    try {
      let sql_query = "SELECT entradas_blog.Titulo, Autores.Email FROM entradas_blog INNER JOIN Autores ON entradas_blog.ID_autor = Autores.ID_autor WHERE Autores.Email=$1";
      result = await client.query(sql_query, [email]); // evita SQL Injection
      console.log(result);

    } catch (err) {
      throw err;
    }
    finally {
      client.release();
    }
    return result;
  }

}
module.exports = entries;