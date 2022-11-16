import config from '../../config'
import mongoose from "mongoose"
import Logger from "../../utils/logger"

const connection = async () => {
    try {
        await mongoose.connect(`${config.MONGO_ATLAS_URL}`)
        Logger.info('Connected to mongoDB Atlas!')
    } catch (err) {
        Logger.error(err)
    }
}

export default connection
