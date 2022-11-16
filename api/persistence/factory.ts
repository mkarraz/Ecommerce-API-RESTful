import config from '../config/index'
import mongoDbAtlasProd from "./DAOs/products/mongoDbAtlas"
import mongoDbAtlasCart from "./DAOs/cart/mongoDbAtlas"
import mongoDbAtlasOrder from "./DAOs/order/mongoDbAtlas"
import mongoDbAtlasUser from "./DAOs/user/mongoDbAtlas"
import mongoDbAtlasChat from './DAOs/chat/mongoDbAtlas'
import Logger from "../utils/logger"

class PersistenceFactory {
    static getPersistence(persistence: string | number, modelName: any){
        try {
            switch (persistence) {
                case 1:
                    if (modelName === 'products') { return mongoDbAtlasProd }
                    if (modelName === 'cart') { return mongoDbAtlasCart }
                    if (modelName === 'order') { return mongoDbAtlasOrder }
                    if (modelName === 'user') { return mongoDbAtlasUser }
                    if (modelName === 'chat') { return mongoDbAtlasChat }
                    break;
            
                default:
                    if (modelName === 'products') { return mongoDbAtlasProd }
                    if (modelName === 'cart') { return mongoDbAtlasCart }
                    if (modelName === 'order') { return mongoDbAtlasOrder }
                    if (modelName === 'user') { return mongoDbAtlasUser }
                    if (modelName === 'chat') { return mongoDbAtlasChat }
                    break;
            }

            throw new Error('Persistence not found')
        }catch(err){
            console.log(err)
            Logger.error('Persistence type not found')
        }
    }
}

const persistence = config.PERSISTENCE

export default (modelName: any) => PersistenceFactory.getPersistence( persistence, modelName )