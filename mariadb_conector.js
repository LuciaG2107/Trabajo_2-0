//importar
var mysql = require('mysql');

//conexion 
var conectar = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'maptos'
});

conectar.connect(function(error){
    if(!!error) {
        console.log(error);
    }else {
        console.log("Conectado");
    }
});

/*var conectar = () => {
    conectar.connect(err => {
        if(!err) {
            console.log("Conectado");
        }else {
            console.log("Erro al conectar")
        }
    });
}*/

/*connection.connect(function(err) { 
    if (err) { 
        return console.error('error: ' + err.message); 
    } console.log('Connected to the MySQL server.'); 
});*/
/*conectar.connect(function(err) { 
    if (err) throw err;
    console.log('Se conecto a la base de datos.'); 
});/

/**
* Agregar los datos que pasamos con un metodo de 'funciones.js'
*/
/*const agregarContacto = (correoUsuario, contrasenna) => {
    const sql = `INSERT INTO usuario (correoUsuario, contrasenna) VALUES ("${correoUsuario}", "${contrasenna}");`
    connection.query(sql, function(err, result, filed){
        if(err) throw err
        console.log(result)
    })
}*/







//export {conectar};
module.exports = conectar;