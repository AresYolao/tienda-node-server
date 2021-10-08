
const mongoose = require('mongoose')
const dbConnection = async () =>{

    try {
       await  mongoose.connect(process.env.MONGODB_ATLAS,{
           useNewUrlParser:true,
           useUnifiedTopology: true
       });

       console.log('Base de datos Online')
    } catch (error) {
        console.log(error)
        throw new Error('Error eal iniciar la Base de Datos')
    }
}


module.exports = {
    dbConnection
}