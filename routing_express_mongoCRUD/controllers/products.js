const prod = require('../utils/products')
const menu = require('../data/menu')
const db = require('../models/db')

const routes = {
    getProducts: async (req, res) => {

        // Obtener de la BBDD MongoDB productos
        //...
        //...
        let id = req.query.id || "";
        let data = await db.getProducts(Number(id));
        //let data = await prod.getProducts(`https://fakestoreapi.com/products/${id}`)
        // Cambiar siguiente linea
        res.status(200).json(data);
    },
    addProduct: async (req, res) => {

        // Añadir documento a la BBDD MongoDB productos
        let data = await db.createProduct(req.body);
        //let data = await prod.createProduct('https://fakestoreapi.com/products',req.body);
        console.log(data);
        res.status(200).json({id:data, status:"OK. Todo insertado. Me voy a comer"});

    },
    getFood: (req, res) => {
        res.status(200).json(menu);
    }
}
module.exports = routes;