/**SERVIDOR Y COMUNICACION CON LA BASE DA DETOS => BACKEND*/
/*SERVIDOR Y BASE DE DATOS*/

const http = require("http");
var express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { features } = require("process");
const fs = require('fs').promises;
const path = require('path');
var mysql = require('mysql');


/*SERVIDOR*/
var app = express();
var host = 'localhost';
var port = 8080;

var bodyParser = require('body-parser');
const { isGeneratorFunction } = require("util/types");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname));
//app.use(express.static(path.join(__dirname,'media')));

app.get('/', function (req, res) {
    fs.readFile(__dirname + "/home.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

/*BASE DE DATOS*/

app.use(cookieParser());

//conexion 
var conectar = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'maptos',
    host: 'localhost',
    port: 3306,
});
conectar.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log("Conectado");
    }
});

/**Signup*/
app.get('/signup', function (req, res) {
    fs.readFile(__dirname + "/signup.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(201);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});
app.post('/signup', function (req, res) {
    console.log("HOLA");
    //variables
    var correoUsuario = req.body.correoUsuario;
    var contrasenna = req.body.contrasenna;
    var confirmar_contrasenna = req.body.confirmar_contrasenna;

    console.log("QQQQQQ");
    //const selectBD = () => {
    console.log("QUE TAL?");
    //if (confirmar_contrasenna == contrasenna) {
    conectar.connect(function (err) {
        conectar.query("INSERT INTO usuario (correoUsuario, contrasenna) VALUES ('" + correoUsuario + "', '" + contrasenna + "')", function (err, result, fields) {
            if (err) {
                if (err.errno == 1062) {
                    console.log("DENTRO DEL IF")
                    var sql = "UPDATE usuario SET correoUsuario ='" + correoUsuario + '",contrasenna ="' + contrasenna + '"';
                    console.log(sql);
                    conectar.query(sql, function (err, result) {
                        console.log(result);
                    });
                    res.end();

                } else {
                    throw err;
                    res.end();
                }
            }
            console.log("1 record inserted");
            fs.readFile(__dirname + "/login")
                .then(contents => {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                })
        });
    });
});

/**login*/
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}))
app.get('/login', function (req, res) {
    fs.readFile(__dirname + "/login.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(201);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});
app.post('/login', function (req, res) {
    var correoUsuario = req.body.correoUsuario;
    var contrasenna = req.body.contrasenna;

    conectar.query('SELECT * FROM usuario  WHERE correoUsuario ="' + correoUsuario + '"', function (err, results, fields) {
        console.log(results)
        if (results.length == 0) {
            //compara el correo -> comprueba si exitre el usuario
            console.log(results.length)
        } else if (contrasenna == results[0].contrasenna) {
            console.log("Contraseña correcta")
            req.session.usuario = correoUsuario;
            //req.session.contrasenna = contrasenna;

            //se cambia el  contenido
            console.log("entra usuario")

            //redirige a la pagina principal
            res.redirect("/")
        } else {
            console.log("Contraseña no correcta")
        }
    });
});

//cerrar sesion
app.get('/logout', function (req, res) {
    //saber si hay sesion
    console.log(req.session.usuario)
    if (req.session.usuario !== null) {
        console.log("cambiar el div del menu de la parte Login")
        req.session.usuario == null
        res.redirect("/signup")
        console.log(req.session.usuario)
    }else{
        console.log("Sacar mensje de que no ha logeado el usuario")
    }
});
app.get('/test', function(req, res){
    console.log("Hola")
    res.send('Hola mundo');
    res.end()
});

//map 
app.get('/map', async function (req, res) {
    console.log(req.session.session);
    
    //if(req.session.usuario !== null){
    conectar.query("SELECT longitud, latitud, nomMarca  FROM usuario INNER JOIN marcador ON usuario.correoUsuario=marcador.correoUsuario_usuario;", function(err, results, fields){
        console.log(results)
        res.send(results);
        fs.writeFile('coordenadas.json', JSON.stringify(results), 'utf8', (err) => {
            if (err) throw err;
            console.log('Se guardo el archivo json de las coordenadas');
        });
    });
        
    //}else{
      //  console.log("Sacar mensje de que no ha logeado el usuario")
    //}

});











/**PUERTO DONDE ESCUCHA*/
app.listen(port, function () {
    console.log(`Server is running on http://${host}:${port}`);
});




