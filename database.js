//importar
var mysql = require('mysql');

//conexion 
var conectar = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'maptos',
    host: 'localhost',
    port: 3306,
});


/*conectar.connect(function(error){
    if(!!error) {
        console.log(error);
    }else {
        console.log("Conectado");
    }
});

module.exports = conectar;*/

const creaConexion = () => {
    const connection = mysql.creaConexion(config); // replace it with connection pool for better performance

    const query = sql => {
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    const end = () => {
        return new Promise((resolve, reject) => {
            connection.end(error => {
                if (error) {
                    reject();
                } else {
                    resolve();
                }
            })
        });
    };

    return new Promise((resolve, reject) => {
        connection.connect(error => {
            if (error) {
                reject(error);
            } else {
                resolve({query, end});
            }
        });
    })
};

module.exports = {
    creaConexion
};