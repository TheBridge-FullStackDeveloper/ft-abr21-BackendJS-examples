const express = require('express')
const router = require('./routes/pages')
const routerApi = require('./routes/products')

const app = express()
const port = 3000

// Motor de vistas
app.set('view engine', 'pug');
app.set('views','./views');

// Para habilitar recepcion de JSONs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Para acceder con API KEY: http://localhost:3000/products?id=4&API_KEY=123abcd
// http://localhost:3000?API_KEY=123abcd

function isAdmin(req, res, next) {
  if (req.query.API_KEY == "123abcd") {
    next();
  } else {
    res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
  }
}
// Middleware para controlar acceso
// Descomentar para probar middelware
//app.use(isAdmin);

//API
//http://localhost:3000/api/products
//http://localhost:3000/api/products?id=2 
app.use('/api',routerApi); // rutas para API

// WEB: usar el Router
app.use('/',router); // rutas para WEB


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})