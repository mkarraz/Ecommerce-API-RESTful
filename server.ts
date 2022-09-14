//Express
import express from 'express'
import session from 'express-session'
//Models
import User from './api/models/schema/user'
/* import products from './api/models/DBProductsContainer' */
/* import daoChatFileSystem from './api/models/daos/chat/daoChatFileSystem' */
//Server config
import serverConfig from './api/config/server'
import mongoDBConfig from './api/config/mongoDBConfig'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import { Server as IOServer } from 'socket.io'
import cluster from 'cluster'
import os from 'os'
//Session routes
import sessionLogin from './api/routes/session/login'
import sessionLogout from './api/routes/session/logout'
import sessionSignup from './api/routes/session/signup'
//Other routes
import productsRouter from './api/routes/productsRouter'
import cartsRouter from './api/routes/cartsRouter'
import randomNumbersRouter from './api/routes/randomNumbersRouter'
import infoRouter from './api/routes/infoRouter'
//Others
import flash from 'connect-flash'
import checkUserAuth from './api/middlewares/checkUserAuth'
import normalizeAndDenormalize from './api/utils/normalizr'
import cookieParser from 'cookie-parser'
import passport from 'passport'
/* import dotenv from 'dotenv' */
import path from 'path'


//Desafio Clase 32
import compression from 'compression'
import Logger from './api/utils/logger'
// Test loggers
Logger.info("Información");
Logger.debug("Debug");
Logger.warn("Advertencia");
Logger.error("Error");


declare module 'express-session' {
    export interface SessionData {
        logged: boolean
        contador: number
        user: string
        admin: boolean
    }
}

//DOTENV
/* dotenv.config() */

//SERVER
/* const port =  8081 */
const port = serverConfig.PORT || 8081
const app = express()

if (process.argv[3] === 'CLUSTER' && cluster.isPrimary) {

    const cpuQty = os.cpus().length //Nro de procesadores detectados.
    Logger.info(`Number of CPUs: ${cpuQty}`)
    Logger.info(`Master PID ${process.pid} is running`)

    for (let i = 0; i < cpuQty; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        /* Reinicia el server si se cae. */
        Logger.info(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })

} else {
    //Si entramos en modo distinto de CLUSTER o NO es un proceso primario.
    app.use('/api/randoms', randomNumbersRouter)

    const serverExpress = app.listen(port, () => {
        Logger.info(`Server listening on port ${port}.`, `Process ID: ${process.pid}.`)
    })
    serverExpress.on('error', (err) => Logger.error(`An error has ocurred when starting: ${err}`))


    
}



//MIDDLEWARES
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())//Acceso al rec.body
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

//CONFIGURACION MOTOR DE PLANTILLAS EJS
app.set('views', path.join(__dirname, '../api/views'))
app.set('view engine', 'ejs')

//CONFIGURACION DE LA SESION
const mongoOptions: any = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(
    session({
      store: MongoStore.create({
        mongoUrl:
            mongoDBConfig.mongoDB.URI,
            mongoOptions,
      }),
      secret: process.env.SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
      rolling: true, // Reinicia el tiempo de expiracion con cada request
      cookie: {
        maxAge: 60000 * 10,
      },
    })
)

//CONEXION A LA DB
mongoose.connect(
    mongoDBConfig.mongoDB.URI,
    mongoOptions,
    (err) => {
        try {
            Logger.info('Connected to MongoDB Atlas')
        } catch (err) {
            Logger.error(`${err}`)
        }
    }
)

//PASSPORT
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

passport.serializeUser((user: any, done: any) => {
    done(null, user._id)
})
  
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user)
})

//ROUTES

/* app.use(checkUserRole) *///Middleware: checks user role.
/* app.use(wrongRoute) *///Middleware: checks not implemented route.

app.use("/login", sessionLogin)
app.use("/logout", sessionLogout)
app.use("/signup", sessionSignup)
app.use('/api', productsRouter, cartsRouter)//Conexiones hacia las rutas.

app.get("/", async (req, res: express.Response) => {
	res.render("home", { logged: true, user: req.user })
})

app.use("/info", infoRouter)
app.use("/infoCompressed", compression(), infoRouter)
/* app.use('/randoms', randomNumbersRouter) */

