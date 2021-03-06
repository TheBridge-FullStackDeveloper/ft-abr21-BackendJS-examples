const Entry = require('../models/Entry')


const routes = {
    getEntries: async (req, res) => {

        // Obtener email de autor
        let email = req.query.email;
        // Llamar al método del modelo
        try {
            const data = email? await Entry.getEntriesByEmail(email):await Entry.getAllEntries();
            res.status(200).json(data);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },
    addEntry: async (req, res) => {
        const entry = Object.values(req.body); // entry . Conversión de {} a []
          try {
            const data = await Entry.createEntry(entry);
            res.status(201).json({ data, status:"OK. Todo insertado. Me voy a desayunar" });
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
    }
}
module.exports = routes;

// Para crear noticia desde REST client
/*
    {Titulo:"n1",
    Contenido:"c1", 
    Tematica:"t1",
    email:"pepe@gmail.com"}
    */

  