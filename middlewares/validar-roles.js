const { request, response } = require("express")


const esAdminRole = (req = request, res = response,next) =>{

if(!req.usuario){
    return res.status(500).json({
    msg: 'se require verificar el role sin validar el token primero'
    })
    
}

const {role,nombre} = req.usuario;

if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
        msg: `${nombre} no es administrador`    });
}

next();
}


const tieneRole = (...roles) =>{

return  (req = request, res = response,next) =>{
    if(!req.usuario){
        return res.status(500).json({
        msg: 'se require verificar el role sin validar el token primero'
        })
        
    }

    if(!roles.includes(req.usuario.role)){
        return  res.status(401).json({
            msg: `el servicio requiere uno de los siguientes roles ${roles}`
        })
    }

    next();
}
    }


module.exports = {
    esAdminRole,
    tieneRole
}