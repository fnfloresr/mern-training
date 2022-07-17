const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objSchema = new Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    monto: { type: Number, required: true },
    fecha_registro: { type: Date, default: Date.now() }
}, {
    versionKey: false // deshabilitar la propiedad "__v"
});

module.exports = mongoose.model('registro', objSchema);