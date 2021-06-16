const router = require('express').Router();
const entries = require('../controllers/entries');

// Montando CRUD

// Dame TODAS las entradas del blog
// http://localhost:3000/api/entries
// Buscar entradas de autor por EMAIL
// http://localhost:3000/api/entries?email=pepe@gmail.com

// READ
router.get('/entries', entries.getEntries)

// Crear entrada de un autor con cierto EMAIL
//CREATE
router.post('/entries', entries.addEntry)

router.all("*", (req, res) =>
  res
    .status(404)
    .json({ message: "Route does not exist", app: "Express-Routes" })
);


module.exports = router;