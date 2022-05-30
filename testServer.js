/*SERVIDOR Y BASE DE DATOS*/

/*Variables y constantes de Servidor*/
const http = require("http");
var express = require("express");
const { features } = require("process");
const fs = require('fs').promises;
const path = require('path');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*Variables y constantes de Base de datos*/
var mysql = require('mysql');
//const database = require('./database.js');
const session = require('express-session');

var host = 'localhost';
var port = 8080;

/*SERVIDOR*/

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

//conexion 
var conectar = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'maptos',
    host: 'localhost',
    port: 3306,
});
conectar.connect(function(error){
    if(!!error) {
        console.log(error);
    }else {
        console.log("Conectado");
    }
})
/*Signup*/
app.get('/signup', function (req, res) {
    fs.readFile(__dirname + "/signup.html")
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
app.post('/signup', function (req, res) {
    console.log("HOLA");
    //variables
    var correoUsuario = req.body.correoUsuario;
    var contrasenna = req.body.contrasenna;
    var confirmar_contrasenna = req.body.confirmar_contrasenna;

    res.write('Tu correo "' + req.body.correoUsuario + '".\n');
    res.write('Tu contraseña "' + req.body.contrasenna + '".\n');

    //if (confirmar_contrasenna == contrasenna) {
        conectar.connect(function (err, result, fields) {
            if (err ) throw err;
            var sql = "INSERT INTO usuario (correoUsuario, contrasenna) VALUES ('" + correoUsuario + "', '" + contrasenna + "')";

            con.query(sql, function (err, result) {
                if (err) {
                    if (err.errno == 1062) {
                        var sql = 'UPDATE usuario SET correoUsuario ="' + req.body.correoUsuario + '",contrasenna ="' + req.body.contrasenna + '"';

                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log(result.affectedRows + " record(s) updated");
                        });
                    } else {
                        throw err;
                    }
                }
                console.log("1 record inserted");
            });
        });
    /*} else {
        console.log("Contraseñas diferentes.")
    }*/
});

//login


app.listen(port, function () {
    console.log(`Server is running on http://${host}:${port}`);
});




