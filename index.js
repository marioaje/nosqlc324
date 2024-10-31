//Llamado de librerai en la cual permita la carga del api
//const sirve para declarar una variable o clases
const express = require('express');//Modulo express

const app = express();//LLamo a la instancia de express

//delcaro un puerto de salida.
//Puero 80, no sirve

//smtp 981, 65, 27, 
//15?

//Usen puertos del 3000 en adelante
const port = 3001;
const hostname = 'http://localhost';

//declaracion de solicitudes, se le conooce como las peteciones, formato json

app.use(express.json());



//nosql
let clienyts = [
    {
        id: 1,
        nombre: "Mario"
    },
    {
        id: 2,
        nombre: "Isaac"
    },
    {
        id: 3,
        nombre: "Alberto"
    }
];

///obtener todos los datos desde una coleccion o table
app.get('/clientes', (req, res) =>{
        res.json(clienyts);
}); 

//2-obtener por id
app.get('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const clienteBusqueda = clienyts.find(c => c.id === id);

    if(clienteBusqueda){
        res.json(clienteBusqueda);
    }
    
    res.status(404).json({message:"El cliente no esta"});
    
}); 

//3-crear datos, post
app.post('/clientes', (req, res) =>{
    
    const nuevoCliente =
    {
        id: clienyts.length + 1,
        nombre: req.body.nombre,
    };

    clienyts.push(nuevoCliente);
    res.status(201).json(nuevoCliente);



//    res.json(clienyts);
}); 

//4-put o actualizar
app.put('/clientes/:id', (req, res) =>{
    

    const _id = parseInt(req.params.id);

    const clienteBusqueda = clienyts.find(c => c.id === _id);

    if(!clienteBusqueda){
        res.status(404).json({message:"El cliente no esta"});
    }
    else{
        //clienteBusqueda.id = _id;
        clienteBusqueda.nombre = req.body.nombre
        res.json(clienteBusqueda);
    }
//Esto servira para NoSQL
    // const nuevoCliente =
    // {
        
    //     id: _id,
    //     nombre: req.body.nombre,
    // };

    
    res.status(201).json(nuevoCliente);



//    res.json(clienyts);
}); 


//5-eliminar datos delete
app.delete('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const clienteBusqueda = clienyts.findIndex(c => c.id === id);

    if(clienteBusqueda){
        const clienteEliminado = clienyts.splice(clienteBusqueda, 1 );
        res.json(clienteEliminado);
    }
    
    res.status(404).json({message:"El cliente no esta"});
    
}); 



//Un test del api...
//Inicialicio el proyecto
app.listen(port,
    ()=>{
        console.log(`El servidor se esta ejecutando... ${hostname}:${port}`);
    }
);