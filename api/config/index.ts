import dotenv from 'dotenv'


dotenv.config()

/* const mongoDBConfig = {
  mongoDB: {
    URI: `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  }
} */

const MONGO_USR = process.env.MONGO_USR
const MONGO_PWD = process.env.MONGO_PWD
const MONGO_CLUSTER = process.env.MONGO_CLUSTER
const persistence = process.argv[4] || process.env.PERSISTENCE || 3//Seteo persistencia mongoAtlas por default

const persistenceConfig = {
  MONGO_ATLAS_URL: `mongodb+srv://${MONGO_USR}:${MONGO_PWD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  PERSISTENCE: persistence,
}

export default persistenceConfig 