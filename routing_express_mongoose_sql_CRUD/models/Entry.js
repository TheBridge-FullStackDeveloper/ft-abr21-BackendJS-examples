const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root', 
    password:'',
    port:3307, // por defecto es 3306 y no hace falta esto. Para mi es 3307
    connectionLimit: 5,
    database:"bbdd"
});

// CRUD
const entries = {

    // entry --> ["n1","c1","t1","pepe@gmail.com"]
    createEntry: async (entry) => {
        let result;
        let conn;
        try {
          conn = await pool.getConnection();
          let sql_query = "INSERT INTO `entradas_blog`( `Titulo`, `Contenido`, `Tematica`,`ID_autor`) VALUES (?,?,?,(SELECT `ID_autor` FROM `Autores` WHERE `Email`=?))";
          result = await conn.query(sql_query,entry); // evita SQL Injection
          console.log(result);
      
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }  
        return result; 
    },

    getAllEntries: async () => {
        let result;
        let conn;
        try {
          conn = await pool.getConnection();
          let sql_query = "SELECT * FROM entradas_blog";
          result = await conn.query(sql_query); // evita SQL Injection
          console.log(result);
      
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }  
        return result; 
    },
    getEntriesByEmail: async (email) => {
        let result;
        let conn;
        try {
          conn = await pool.getConnection();
          let sql_query = "SELECT entradas_blog.Titulo, Autores.Email FROM entradas_blog INNER JOIN Autores ON entradas_blog.ID_autor = Autores.ID_autor WHERE Autores.Email=?";
          result = await conn.query(sql_query,[email]); // evita SQL Injection
          console.log(result);
      
        } catch (err) {
          throw err;
        } finally {
          if (conn) conn.end();
        }  
        return result; 
    }
    
}
module.exports = entries;