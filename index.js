//Llamado de librerai en la cual permita la carga del api
//const sirve para declarar una variable o clases
const express = require('express');//Modulo express

const app = express();//LLamo a la instancia de express

//delcaro un puerto de salida.
//Puero 80, no sirve

//smtp 981, 65, 27, 
//15?

//Usen puertos del 3000 en adelante
const port = 3000;
const hostname = '127.0.0.1';

//declaracion de solicitudes, se le conooce como las peteciones, formato json

app.use(express.json());

//Un test del api...
//Inicialicio el proyecto
app.listen(port,
    ()=>{
        console.log("El servidor se esta ejecutando...")
    }
);