const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

// Conexión
async function conn(){
    const client = await MongoClient(url,{ useUnifiedTopology: true });
    client
    .connect()
    .then(()=>console.log("Ha funcionado! estamos conectados"))
    .catch(e=>console.log(e));
    return client; // Objeto de conexion a la BBDD
}

// CRUD
const products = {
    // Create --> db.collection.insertMany() o insertOne()
    createProduct: async (producto) => {
        const client = await conn(); // abrir conexion a la BBDD
        const result = await client.db("database")
                                    .collection("productos")
                                    .insertOne(producto);

        console.log(`${result.insertedCount} nuevo producto(s) creado con el siguiente id(s):`);
        console.log(result.insertedId);
        return result.insertedId;
    },
    // Read --> db.collection.find()
    getProducts: async (id) => {
        const client = await conn();
        let result;
        id? result = await client.db("database").collection("productos").find({ "id": id }).toArray():
            result = await client.db("database").collection("productos").find().toArray();
            console.log("***************************")
            console.log(result)
    
        if (result) {
            console.log(`Found a listing in the collection with ID '${id}':`);
            console.log(result);
        } else {
            console.log(`No listings found with ID'${id}'`);
        }
        return result;
    }
}
module.exports = products;




// Update --> db.collection.updateMany() o updateOne()

// Delete --> db.collection.deleteMany() o deleteOne()
