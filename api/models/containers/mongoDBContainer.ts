import mongoose from 'mongoose'
import config from '../../config/mongoDBConfig'

class MongoDBContainer {
    model: mongoose.Model<any, {}, {}, {}>/* Indico que el campo model debe ser inicializado de la forma especificada */

    constructor(model: mongoose.Model<any, {}, {}, {}>) {
        this.model = model
        this.connect()
    }

    private async connect() {
        try {
            await mongoose.connect(config.mongoDB.URI)/* Conexión a MongoDB */
            console.log('Connected to mongoDB Atlas!')
        } catch (err) {
            console.log(err)
        }
    }
}

export default MongoDBContainer
