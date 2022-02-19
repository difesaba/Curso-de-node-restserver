const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        // Si la base de daros no esya arriba
        throw new Error('Erro a la hora de iniciar la base de datos');
    }
}


module.exports = {
    dbConnection
} 