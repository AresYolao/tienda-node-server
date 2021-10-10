const { response } = require('express');
const {Producto} = require ('../models');


const getProductos = async (req, res = response) => {

   const {limite = 5, desde = 0} = req.query;
   const filtro = {estado: true}

   const [total, productos] = await Promise.all([
       Producto.countDocuments(filtro),
       Producto.find(filtro)
       .populate('usuario')
       .populate('categoria')
       .populate('medida')
       .skip(Number(desde))
       .limit(Number(limite))
   ]);

   res.json({
       total,
       productos
   })
}

const getProducto = async (req, res = response) => {

    const id = req.params.id;
    const producto = await Producto.findById(id).populate('usuario').populate('categoria').populate('medida');

 
    res.json(producto)
 }

const postProducto = async (req, res = response) => {

    const { _id, estado,usuario, ...data } = req.body;
    data.nombre =  data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const productoDB = await Producto.findOne({nombre: data.nombre});

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${nombre} ya existe`
        });
    }

    if(data.contenido && !data.medida){
        return res.status(400).json({
            msg:`El producto ${nombre} requiere una unidad de medida para el contenido ${data.contenido}`
        });
    }

    const producto =  new Producto(data);

    await producto.save();

    res.status(201).json(producto);

}

const putProducto = async (req, res = response) => {
    const id = req.params.id;

    const { _id, estado,usuario, ...data } = req.body;
    data.nombre =  data.nombre.toUpperCase();
    data.usuario = req.usuario_id;

    if(data.contenido && !data.medida){
        return res.status(400).json({
            msg:`El producto ${nombre} requiere una unidad de medida para el contenido ${data.contenido}`
        });
    }

    const productoDB = await Producto.findOne({codigoBarras: data.codigoBarras});

    if(productoDB && productoDB.id != id){
        return res.status(400).json({
            msg:`El codigo de barras ${data.codigoBarras} ya existe`
        });
    }

    const producto = await Producto.findByIdAndUpdate(id, data,{new:true}).populate('usuario').populate('categoria')
    res.json(producto);
}


const deleteProducto= async (req, res = response) => {
   
    const id = req.params.id;
    const data = {
        estado:false,
        usuario: req.usuario._id
    }
    const producto = await Producto.findByIdAndUpdate(id,data,{new: true});
    res.json(producto);
}





module.exports = {
    getProducto,
    getProductos,
    postProducto,
    putProducto,
    deleteProducto
}