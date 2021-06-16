const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
} 
  */

const productSchema = new Schema({
    id: {
        type:Number,
        required:true,
        unique:true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },  
    description: {
        type: String,
    required: true
    },
    category: {
        type: String
    },
    image: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://') === 0;
            },
            message: 'la URL de la imagen debe empezar por https://'
        }
    },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;