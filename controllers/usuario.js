const {response} = require('express')


const getUsuario = (req, res = response) => {

    const query = req.query;
    res.json({
        query,
        msg: 'get API- controlador'
    })
}

const postUsuario = (req, res = response) => {

    const body = req.body;
    
    res.json({
    
        msg: 'post API- controlador',
        body
    })
}
const putUsuario = (req, res = response) => {
    const id = req.params.id;
    res.json({
        id,
        msg: 'put API- controlador'
    })
}
const deleteUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API- controlador'
    })
}





module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}