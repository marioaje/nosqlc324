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

// //Creamos la conexion hacia la BD mongo
// console.log("Inicia Mongo");
// mongoose.connect(ulrMongo,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).
// then(() => console.log('Base de datos alive...'))
// .catch((error) => console.log('Error: ' + error));
// console.log("Fin Mongo");


console.log("Inicia Mongo Nube");
const urlNube = "mongodb+srv://marioaje:tADNkbcVvRamXWe1@clusteragenciaaks.41etj.mongodb.net/agenciaaks?retryWrites=true&w=majority";
//Creamos la conexion hacia la BD mongonube
mongoose.connect(urlNube,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(() => console.log('Base de datos en la nube alive...'))
.catch((error) => console.log('Error: ' + error));
console.log("Fin Mongo Nube");



//Podemos crear un esquema o entidad de datos
const SchemaUsuarios = new mongoose.Schema(
    {
        id: Number,
        nombre: String,
        direccion: String,
        Correo: String,
        Telefono: String
    }
);


const Usuarios = mongoose.model('Usuarios', SchemaUsuarios  );


///obtener todos los datos desde una coleccion o table
app.get('/Usuarios', async (req, res) =>{
    try{
        const schemaDatosColeccion = await Usuarios.find();
        res.json(schemaDatosColeccion);
    }catch(err){
        res.status(500).json({message:"Error al obtener los datos " + error.message});

    }
    
}); 



//2-attualza datos, post
app.put('/Usuarios/:id', async (req, res) =>{
    

    try{
        const {            
            id,                 
            nombre,
            direccion,
            Correo,
            Telefono
        } = req.body;


        const datoModificado = await Usuarios.findOneAndUpdate        
        (
            {
                id: req.params.id,
            },
            {                   
                nombre,
                direccion,
                Correo,
                Telefono
            },
            {
                new: true
            } 

        );
        
        if (!datoModificado){
            return res.status(404).json({message: "Not Found"} );    
        }
        res.status(200).json(datoModificado);
    }catch(error){
        res.status(500).json({message:"Error al actualizar los datos " + error.message});
        
    }

});


//3-crear datos, post
app.post('/Usuarios', async (req, res) =>{
    
    const {                   
                id,
                nombre,
                direccion,
                Correo,
                Telefono
            } = req.body;

                //asigno los elementos Usuarios

    const nuevoDato  = new Usuarios({                   
        id,
        nombre,
        direccion,
        Correo,
        Telefono
    }) ;     
    
    try{
        const datoGuardado = await nuevoDato.save();
        res.status(201).json(datoGuardado);
    }catch(error){
        res.status(500).json({message:"Error al crear los datos " + error.message});
        
    }

    
}); 



//Eliminar

app.delete('/Usuarios/:id', async (req, res) =>{
    try{
        const usuarioEliminado = await Usuarios.findOneAndDelete({id:req.params.id}); 

        if (!usuarioEliminado){
            return res.status(404).json({message: "Not Found"} );   
        }
        res.status(200).json("Ususario eliminado");
    }catch(error){
        res.status(500).json({message:"Error al borrar los datos " + error.message});
    }
});


//Un test del api...
//Inicialicio el proyecto
app.listen(port,
    ()=>{
        console.log(`El servidor se esta ejecutando... ${hostname}:${port}`);
    }
);