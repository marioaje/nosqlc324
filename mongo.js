//Llamado de librerai en la cual permita la carga del api
//const sirve para declarar una variable o clases
const express = require('express');//Modulo express
const { default: mongoose } = require('mongoose');

const app = express();//LLamo a la instancia de express

//delcaro un puerto de salida.
//Puero 80, no sirve

//smtp 981, 65, 27, 
//15?

//Usen puertos del 3000 en adelante
const port = 3002;
const hostname = 'http://localhost';

//declaracion de solicitudes, se le conooce como las peteciones, formato json

app.use(express.json());

const ulrMongo = 'mongodb://localhost:27017/miapi';

//Creamos la conexion hacia la BD mongo
mongoose.connect(ulrMongo,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(() => console.log('Base de datos alive...'))
.catch((error) => console.log('Error: ' + error));


//Un test del api...
//Inicialicio el proyecto
app.listen(port,
    ()=>{
        console.log(`El servidor se esta ejecutando... ${hostname}:${port}`);
    }
);