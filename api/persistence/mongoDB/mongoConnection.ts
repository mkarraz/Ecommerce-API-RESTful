import persistenceConfig from "../../config"
import mongoose from "mongoose"
import Logger from "../../utils/logger"

const connection = async () => {
    try {
        await mongoose.connect(persistenceConfig.MONGO_ATLAS_URL)/* Conexión a MongoDB */
        Logger.info('Connected to mongoDB Atlas!')
    } catch (err) {
        Logger.error(err)
    }
}

export default connection
