

const{Schema,model} = require('mongoose')

const MedidaSchema = Schema({

    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique:true
    },

    estado: {
        type: Boolean,
        default: true,
        required: true
    },


    abreviatura: {
        type: String,
        required: true,
        unique: true
    }

})
module.exports = model('Medida',MedidaSchema)