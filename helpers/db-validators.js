const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(role = '') =>{
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El role ${role} no existe en la Base de Datos`)
    }
}

const existeCorreo = async(correo = '') =>{

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya existe en la Base de Datos`)
    }
}
   
const existeUsuarioById = async(id) =>{

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe en la Base de Datos`)
    }
}
   

module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuarioById
}