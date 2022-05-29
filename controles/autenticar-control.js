/**
 * Archivo usuarios: 
 * registrar el usuario => login
 * id="correoUsuario"
 * id="contasenna" 
 */

var cryptr = require('cryptr');
cryptr = new cryptr('miContraseñaSecreta');
var conectar = require('./../mariadb_conector.js');
/*import cryptr from 'cryptr';
import conectar from './../mariadb_conector.js';*/

module.exports.authenticate = function(req, res){
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
}

