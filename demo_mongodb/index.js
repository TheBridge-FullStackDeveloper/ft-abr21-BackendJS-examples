const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useUnifiedTopology: true } ,function(err, db) {
  if (err) throw err;
  const dbo = db.db("database");
  // Crear colección
  /*
  dbo.createCollection("mensajes", function(err, res) {
    if (err) throw err;
    console.log("Colección creada!");
    db.close();
  });
  */

  // Insertar
  /*
  let myobj = [
    { name: 'John', message: 'Highway 71'},
    { name: 'Peter', message: 'Lowstreet 4'},
    { name: 'Amy', message: 'Apple st 652'},
    { name: 'Hannah', message: 'Mountain 21'},
    { name: 'Michael', message: 'Valley 345'},
    { name: 'Sandy', message: 'Ocean blvd 2'},
    { name: 'Betty', message: 'Green Grass 1'},
    { name: 'Richard', message: 'Sky st 331'},
    { name: 'Susan', message: 'One way 98'},
    { name: 'Vicky', message: 'Yellow Garden 2'},
    { name: 'Ben', message: 'Park Lane 38'},
    { name: 'William', message: 'Central st 954'},
    { name: 'Chuck', message: 'Main Road 989'},
    { name: 'Viola', message: 'Sideway 1633'}
  ];
  dbo.collection("mensajes").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
  */

  // Buscar
  dbo.collection("mensajes").findOne({name:"Chuck"}, function(err, result) {
    if (err) throw err;
    console.log(`Nombre: ${result.name} Mensaje:${result.message}`);
    //db.close();
  });

  // Borrar
  dbo.collection("mensajes").deleteOne({ name: 'Michael' }, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    //db.close();
  });

  // Buscar por orden descendente
  let mysort = { name: -1 };
  dbo.collection("mensajes").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log("******Descendente*******");
    console.log(result);
    db.close();
  });


});

