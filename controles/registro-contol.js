/**
 * Archivo usuarios: 
 * registrar el usuario => signup
 * name="correoUsuario"
 * name="contrasenna"
 */
//var cryptr = require('cryptr');
//cryptr = new cryptr('miContraseñaSecreta');
var express = require("express");
var router = express.Router();
var conectar = require('./../mariadb_conector.js');

router.get('/registro', function(req, res, next){
    res.render('signup');
});

router.post('/registro', function(req, res, next){
    //atribitos start
    usuario = {
        correoUsuario: req.body.correoUsuario,
        contrasenna: req.body.contrasenna,
        confirmar_contrasenna: req.body.confirmar_contrasenna
    }
    //atributos end

    //check unique start
    var sql = 'SELECT * FROM usuario WHERE correoUsuario = ?';
    conectar.query(sql, [usuario.correoUsuario], function(err, data, fields){
        if(err) throw err
        if(data.length>1){
            var msg = usuario.correoUsuario + "ya existe ese usuario";
        }else if(usuario.confirmar_contrasenna != usuario.contrasenna){
            var msg = "Diferentes contraseñas. Tienen que ser iguales";
        }else{
            //introducir start
            var sql = 'INSERT INTO usuario SET ?';
            conectar.query(sql, usuario, function(err, data){
                if(err) throw err;
            });
            var msg = "Usuario guardado"
            //introducir end
        }
        res.render('signup',{alertMssg:msg});
    })
    //check unique end
});

module.exports = router;

/*module.exports.register=function(req, res){
    var encryptedScript = cryptr.encrypt(req.body.contrasenna);
    var userio={
        "correoUsuario":req.body.correoUsuario,
        "contrasenna":encryptedScript
    }
    conectar.query('INSERT INTO usuario SET ?',usuario, function(error, results, fields){
        if(error){
            res.json({
                status: false,
                message: 'Error en la consulta'
            })
        }else{
            res.json({
                status: true,
                data: results,
                message: 'Usario registrado'
            })
        }
    });
}*/

