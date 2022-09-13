import dotenv from 'dotenv'

dotenv.config()
const USR = process.env.MONGOUSR
const PWD = process.env.MONGOPWD
const CLUSTER = process.env.MONGOCLUSTER

const mongoDBConfig = {
  mongoDB: {
    URI: `mongodb+srv://${USR}:${PWD}@${CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  }
}

export default mongoDBConfig