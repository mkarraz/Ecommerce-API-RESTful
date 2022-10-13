import persistenceConfig from "../config"
import mongoDbAtlasProd from "./DAOs/products/mongoDbAtlas"
import mongoDbAtlasCart from "./DAOs/cart/mongoDbAtlas"
import mongoDbAtlasOrder from "./DAOs/order/mongoDbAtlas"
import Logger from "../utils/logger"

class PersistenceFactory {
    static getPersistence(persistence: string | number, modelName: any){
        try {
            switch (persistence) {
                case 3:
                    if (modelName === 'products') { return mongoDbAtlasProd }
                    if (modelName === 'cart') { return mongoDbAtlasCart }
                    if (modelName === 'order') { return mongoDbAtlasOrder }
                    break;
            
                default:
                    if (modelName === 'products') { return mongoDbAtlasProd }
                    if (modelName === 'cart') { return mongoDbAtlasCart }
                    if (modelName === 'order') { return mongoDbAtlasOrder }
                    break;
            }

             //Fyle System
            //if( persistence == 1 ) return import(`./DAOs/${modelName}/filesystem`)
            //Mongo Local
            //if( persistence == 2 ) return import(`./DAOs/${modelName}/mongoDb`)
            //Mongo Atlas

            //MySql Local
            //if( persistence == 4 ) return import(`./DAOs/${modelName}/mysql`)

            throw new Error('Persistence not found')
        }catch(err){
            console.log(err)
            Logger.error('Persistence type not found')
        }
    }
}

const persistence = persistenceConfig.PERSISTENCE

export default (modelName: any) => PersistenceFactory.getPersistence( persistence, modelName )