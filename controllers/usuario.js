const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');



const getUsuario = async(req, res = response) => {

    const {limite = 5,desde = 0} = req.query;
    const filtro = {estado: true}


    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(filtro),
        Usuario.find(filtro)
    .skip(Number(desde))
    .limit(Number(limite))
    ]);
    res.json({
      total,
      usuarios
    })
}

const postUsuario = async (req, res = response) => {


    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });



    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    })
}

const putUsuario = async(req, res = response) => {
    const id = req.params.id;
    const {_id,password,google,correo,...resto} = req.body;
    if(password){
         //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        usuario
    })
}


const deleteUsuario = async (req, res = response) => {
    const id = req.params.id;

    //Borrado físico
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
       usuario
    })
}





module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}