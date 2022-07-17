const model = require("../models/registro.model");

const controlador = {
    listar(req, res){
        model.find({},(err, result)=>{
            if(err){
                res.sendStatus(500);
            }else{
                res.json(result);
            }
        });
    },
    guardar(req, res){
        let dato = new model;
        dato.nombre = req.body.nombre;
        dato.tipo = req.body.tipo;
        dato.monto = req.body.monto;
        dato.save((err, result)=>{
            if(err){
                res.sendStatus(500);
            }else{
                res.json(result);
            }
        });
    },
    buscarPorId(req, res){
        const val_id = req.params.id;
        model.findById(val_id,(err, result)=>{
            if(err){
                res.sendStatus(500);
            }else{
                res.json(result);
            }
        });
    },
    editar(req, res){
        const val_id = req.body._id;
        const datos = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            monto: req.body.monto
        };
        model.findByIdAndUpdate(val_id, datos, {new:true}, (err, result)=>{
            if(err){
                res.sendStatus(500);
            }else{
                res.json(result);
            }
        });
    },
    eliminar(req, res){
        const val_id = req.params.id;
        model.findByIdAndDelete(val_id,(err, result)=>{
            if(err){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });
    },
};

module.exports = controlador;