const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const usuario = await Usuario.findById(uid);
        
if(!usuario){
    return res.status(401).json({
        msg: 'Token no valido - usuario no existe en BD'
    })
}

        //Verificar si el usuario está activo

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - estado inactivo'
            })
        }
        req.uid = uid;
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }



}

module.exports = {
    validarJWT
}