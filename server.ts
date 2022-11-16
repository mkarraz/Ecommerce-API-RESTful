//Express
import express from 'express'
import session from 'express-session'
//Server config
import config from './api/config/index'
import MongoStore from 'connect-mongo'
import cluster from 'cluster'
import os from 'os'
//Socket
import { Server as IOServer } from 'socket.io'
//Routes
import indexRouter from './api/routes/indexRouter'
//Middlewares
import errorHandler from './api/middlewares/errorHandler'
import wrongRoute from './api/middlewares/wrongRoute'
//Others
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { passportLoad } from './api/utils/passport'
import path from 'path'
import Logger from './api/utils/logger'
import ChatService from './api/services/ChatService'

declare module 'express-session' {
    export interface SessionData {
        logged: boolean
        contador: number
        user: string
        admin: boolean
    }
}

//SERVER
const port = config.PORT
const app = express()

if (process.argv[3] === 'CLUSTER' && cluster.isPrimary) {

    const cpuQty = os.cpus().length
    Logger.info(`Number of CPUs: ${cpuQty}`)
    Logger.info(`Master PID ${process.pid} is running`)

    for (let i = 0; i < cpuQty; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        /* Reboot server if needed */
        Logger.info(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })

} else {

    const serverExpress = app.listen(port, () => {
        Logger.info(`Server listening on port ${port}.`, `Process ID: ${process.pid}.`)
    })
    serverExpress.on('error', (err) => Logger.error(`An error has ocurred when starting: ${err}`))

    //SOCKET
    const io = new IOServer(serverExpress)

    io.on('connection', async (socket) => {
        console.log(`New user connected: ${socket.id}`)
        let messagesArray = await ChatService.getMessages()
        
        socket.emit('server:message', messagesArray)

        try {
            socket.on('client:message', async (newMessage) => {
                try {
                    await ChatService.addMessage(newMessage)
                    messagesArray = await ChatService.getMessages()
                } catch (err) {
                    Logger.error(`Error in addMessage socket method: ${err}`)
                }

                io.emit('server:message', messagesArray)
            })
        } catch (err) {
            Logger.error(`Error at receiving client:message socket method: ${err}`)
        }
    })
}

//MIDDLEWARES
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../uploads')))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

//CONFIGURACION MOTOR DE PLANTILLAS EJS
app.set('views', path.join(__dirname, '../api/views'))
app.set('view engine', 'ejs')

//CONFIGURACION DE LA SESION
const mongoOptions: any = config.MONGO_OPTIONS
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
                config.MONGO_ATLAS_URL,
            mongoOptions,
        }),
        secret: config.SECRET_KEY as string,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: Number(config.SESSION_TIME),
        },
    })
)

//PASSPORT
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
passportLoad(passport)

//ROUTES
app.use('/', indexRouter)



//EXTRA ERRORs HANDLER
app.use(errorHandler)

//ROUTE ERRORs HANDLER
app.use(wrongRoute)

