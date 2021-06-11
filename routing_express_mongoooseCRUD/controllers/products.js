const menu = require('../data/menu')
const Product = require('../models/Product')


const routes = {
    getProducts: async (req, res) => {

        // Obtener de la BBDD MongoDB productos
        let id = req.query.id;
        // Llamada a mongoose
        try {
            const data = id? await Product.find({"id":id}):await Product.find();
            res.status(200).json(data);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },
    addProduct: async (req, res) => {
        // Añadir documento a la BBDD MongoDB productos
        const product = new Product(req.body);
          try {
            const newProduct = await product.save();
            res.status(201).json({ newProduct, status:"OK. Todo insertado. Me voy a comer" });
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
    },
    getFood: (req, res) => {
        res.status(200).json(menu);
    }
}
module.exports = routes;