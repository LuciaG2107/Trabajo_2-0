/*SERVIDOR Y BASE DE DATOS*/

/*Variables y constantes de Servidor*/
const http = require("http");
var express = require("express");
const { features } = require("process");
const fs = require('fs').promises;
const path = require('path');



/*Variables y constantes de Base de datos*/
var mysql = require('mysql');
//const database = require('./database.js');
const session = require('express-session');

/*SERVIDOR*/
var app = express();
var host = 'localhost';
var port = 8080;

var bodyParser = require('body-parser');
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
/*Signup*/
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

    /*res.write('Tu correo "' + req.body.correoUsuario + '".\n');
    res.write('Tu contraseña "' + req.body.contrasenna + '".\n');*/
    console.log("QQQQQQ");
    //const selectBD = () => {
    console.log("QUE TAL?");
    //if (confirmar_contrasenna == contrasenna) {
    conectar.connect(function (err) {
        //if (!err){
        //var sql = "INSERT INTO usuario (correoUsuario, contrasenna) VALUES ('" + correoUsuario + "', '" + contrasenna + "')";

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
            fs.readFile(__dirname + "/index.html")
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
        /*}else{
            console.log(err);
        }*/
    });
    //}
    /*else {
        console.log("Contraseñas diferentes.")
    }*/
});


//login
/*
app.post('/search',function(req,res){
    var emailId=req.body.emailIs;
    console.log(emailId);
      res.write('You sent the email "' + req.body.emailIs+'".\n');
      con.connect(function(err) {
if (err) throw err;
con.query('SELECT * FROM userData WHERE emailId ="'+ req.body.emailIs+'"', function (err, result) {
if (err) throw err;
console.log(result);
});
});
});
*/

app.listen(port, function () {
    console.log(`Server is running on http://${host}:${port}`);
});




