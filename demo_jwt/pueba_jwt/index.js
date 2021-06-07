const express = require('express'),
      jwt = require('jsonwebtoken'),
      app = express(); 
	  
const config = {
	llave : "miclaveultrasecreta123*"
};

// 1
app.set('llave', config.llave);

// 2
app.use(express.urlencoded({ extended: true }));

// 3
app.use(express.json());

app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});


// 6
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
	
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

// 4
app.get('/',rutasProtegidas, function(req, res) {
    res.json({ message: 'recurso de entrada' });
});
app.get('/otra',rutasProtegidas, function(req, res) {
    res.json({ message: 'otra ruta' });
});

// 5

app.post('/autenticar', (req, res) => {
    if(req.body.usuario === "alex" && req.body.contrasena === "1234") {
		const payload = {
			check:  true
		};
		const token = jwt.sign(payload, app.get('llave'), {
			expiresIn: 1440
		});
		res.json({
			mensaje: 'Autenticación correcta',
			token: token
		});
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})



app.get('/datos', rutasProtegidas, (req, res) => {
	const datos = [
		{ id: 1, nombre: "Asfo" },
		{ id: 2, nombre: "Denisse" },
		{ id: 3, nombre: "Carlos" }
	];
	
	res.json(datos);
});