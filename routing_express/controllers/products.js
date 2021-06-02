const prod = require('../utils/products')
const menu = require('../data/menu')

const routes = {
    getProducts:  async (req, res) => {
        let id = req.query.id || "";
        let data = await prod.getProducts(`https://fakestoreapi.com/products/${id}`)
        // Cambiar siguiente linea
        res.status(200).json(data);
    },
    addProduct:async (req, res) => {
        let data = await prod.createProduct('https://fakestoreapi.com/products',req.body);
        console.log(data);
        // Cambiar siguiente linea
        res.status(200).json(data);
        //res.status(200).render('product',{data});
    },
    getFood: (req, res) => {
        res.status(200).json(menu);
    }
}
module.exports = routes;