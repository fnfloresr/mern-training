// database setup

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1/monedero")
.then(()=>{
    console.log("Conectados a la base de datos");
})
.catch((err)=>{
    console.log("Error en la conxeion a la base de datos: ", err);
});

const registroRutas = require("./routes/registro.route");

// web server setup

let port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/registro", registroRutas);

app.listen(port, ()=>{
    console.log('Servidor en el puerto :', port);
});