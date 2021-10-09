const { response, request, json } = require("express");
const bcrypjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/gener-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }
        //verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos estado: inactivo'
            })
        }
        //Verificar contraseña
        const validPassword = bcrypjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}



const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;
    // console.log(id_token)

    try {
    
        // const googleUser = googleVerify(id_token);

        // console.log(googleUser)

        const {nombre,correo,img} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //crear usuario
            const data = {
                nombre,
                correo,
                img,
                password: ':P',
                google: true
            };


            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en BD

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador , usuario bloqueado'
            });
        }
   
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    } catch (error) {
console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}
module.exports = {
    login,
    googleSignIn
}