

const {Usuario,Role,Categoria,Producto} = require('../models');


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
 

   
const existeCategoriaById = async(id) =>{

    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id ${id} no existe en la Base de Datos`)
    }
}

const existeProductoById = async(id) =>{

    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id ${id} no existe en la Base de Datos`)
    }
}

const existeCodigoBarras = async(codigoBarras = '') =>{

    const existeCodigo = await Producto.findOne({codigoBarras});
    if(existeCodigo){
        throw new Error(`El codigo de Barras ${codigoBarras} ya existe en la Base de Datos`)
    }
}
module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById,
    existeCodigoBarras
}