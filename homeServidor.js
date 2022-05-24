import express from 'express';
import { conectar } from './mariadb_conector.js';

const PORT = '3300';
const app = express();

/**
 * Start Listening
 */
app.listen(PORT, function() {
    console.log(`Servidor esta en el puerto ${PORT}`);
});

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

/**
 * Router
 */
app.get('/', function(req,res) {
    //res.send("This is not why you're here. Head to /user/:user_id and replace :user_id with your user id");
    conectar();
    res.send('home');
});

app.get('/login/:correo/:contra', function(req, res){
    let correo = req.params.correo
    let contra = req.params.contra
    console.log(correo, contra)
})
