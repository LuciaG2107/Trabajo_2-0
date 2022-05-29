/**
 * ARCHIVO RERVIDOR 
 */

var express = require("express");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var morgan = require('morgan');

var conectar = require('./mariadb_conector.js');
//const { cookie } = require("express-validator");

var app = express();
var PORT = 3300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use(cookieParser());

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));



//verbo/metodo para indicar que quiere el cliente
//path/ruta para identificar el recurso
//headers/cabeceras
//body/payload/cuerpo
/**
 * Configuración de los archivos: pug y estaticos
 */
//pug
app.set('views', './');
app.set('view engine', 'html');
//estaticos
app.use(express.static('./'));
app.use(express.static('./css'));
app.use(express.static('./media'));
app.use(express.static('./controles'));

app.get('/', function(req, res){
    res.send('/home')
})



var registrar = require('./controles/registro-contol')

app.use('/signup.html', registrar);
/*app.get('/login', function(req, res){
    res.sendFile(__dirname ,"./login.html");
})
app.get('/signup', function(req, res){
    res.sendFile(__dirname, "./signup.html");
    /*let correo = req.params.correo
    let contras = req.params.contra
    agregarContacto(correo, contras)*/
//})
/*app.get('./controles/registro-contol', function(req, res){
    res.sendFile("./signup.html")
})
app.get('./controles/autenticar-control', function(req, res){
    res.sendFile("./login.html")
})*/

//console.log(autenticarControl);
/*app.post('./controles/autenticar-control',autenticarControl.authenticate);
app.post('./controles/registro-control',registroControl.authenticate);*/

//app.post('./signup', function(que, res){
   //var password = cryptr.encrypt(req.body.contrasenna);
    //var correoUsuario = req.body.correoUsuario;
    /*conectar.serialize(() => {
        conectar.query('INSERT INTO usuario (correoUsuario, contrasenna) VALUES (?,?)',[req.body.correoUsuario, req.body.contrasenna], function(err){
            if(err){
                return console.log("No se ha podido agregar");       
            }
            console.log("Nuevo usuario");
            res.sendFile('/home.html');
        });
    });*/
    /*conectar.query('INSERT INTO usuario (correoUsuario, contrasenna) VALUES (?,?)',[req.body.correoUsuario, req.body.contrasenna], function(error, results, fields){
        if(error){
            res.json({
                status: false,
                message: 'Error en la consulta'
            })
            console.log("No se ha podido agregar")           
        }else{
            res.json({
                status: true,
                data: results,
                message: 'Usario registrado'
            })
            console.log("se agrego")
        }
    });
});

app.post('login', function(que, res){
    var correoUsuario = req.body.correoUsuario;
    var contasenna = req.body.contasenna;

    conectar.query('SELECT * FROM usuario WHERE correoUsuario = ?', [correoUsuario], function(error, results, fields){
        
        if(error){
            res.json({
                status: false,
                message: 'Se ha producido un error en la consulta'
            })
        }else{
            if(results.length > 0){
                decryptedString = cryptr.decrypt(results[0].contasenna);
                if(contasenna==decryptedString){
                    res.json({
                        status: true,
                        message: 'Autentificacion con exito'
                    })
                    console.log("HOLA CARA DE MONO")
                }else{
                    res.json({
                        status: false,
                        message: "El correo electronico y la contraseña no coinciden"
                    });
                }
            }else{
                res.json({
                    status: false,
                    message: "El correo electronico no existe"
                });
            }
        }
    });
});



/*app.get('/login.html', function(req, res){
    let correo = req.params.correo
    let contras = req.params.contra
    agregarContacto(correo, contras)
});*/


/*app.post('/login', (que));
app.post('index',);*/







/**
 * Start Listening
 */
app.listen(PORT, () => {
    console.log(`Servidor esta en el puerto ${PORT}`);
});



/**
 * Router
 */
/*app.get('/', function(req,res) {
    //res.send("This is not why you're here. Head to /user/:user_id and replace :user_id with your user id");
    conectar();
    res.send('home');
});

app.get('/login.html/:correo/:contra', function(req, res){
    let correo = req.params.correo
    let contras = req.params.contra
    agregarContacto(correo, contras)
});*/