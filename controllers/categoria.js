const { response } = require('express');
const {Categoria} = require ('../models');


const getCategorias = async (req, res = response) => {

   const {limite = 5, desde = 0} = req.query;
   const filtro = {estado: true}

   const [total, categorias] = await Promise.all([
       Categoria.countDocuments(filtro),
       Categoria.find(filtro)
       .populate('usuario')
       .skip(Number(desde))
       .limit(Number(limite))
   ]);

   res.json({
       total,
       categorias
   })
}

const getCategoria = async (req, res = response) => {

    const id = req.params.id;
    const categoria = await Categoria.findById(id).populate('usuario');

 
    res.json(categoria)
 }

const postCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${nombre} ya existe`
        });
    }


    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria =  new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);

}

const putCategoria = async (req, res = response) => {
    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data,{new:true}).populate('usuario')
    res.json(categoria);
}


const deleteCategoria = async (req, res = response) => {
   
    const id = req.params.id;
    const data = {
        estado:false,
        usuario: req.usuario._id
    }
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new: true});
    res.json(categoria);
}





module.exports = {
    getCategoria,
    getCategorias,
    postCategoria,
    putCategoria,
    deleteCategoria
}