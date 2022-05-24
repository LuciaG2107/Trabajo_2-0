//importar
import mysql from 'mysql';

//conexion 
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root@localhost',
    password: '',
    database: 'maptos'
});

const conectar = () => {
    conectar.connect(err => {
        if(err) {
            console.log("conectado");
        }
    });
}

/*connection.connect(function(err) { 
    if (err) { 
        return console.error('error: ' + err.message); 
    } console.log('Connected to the MySQL server.'); 
});*/

export {conectar};