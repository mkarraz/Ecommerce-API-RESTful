import { Request, Response } from 'express'
import Logger from '../utils/logger'
import config from '../config'

class InfoController {

    constructor() { }

    async infoRender(req: Request, res: Response) {
        try {

            return res.render('info', {config})
            
        } catch (err) {
            Logger.error(`Error in infoRender method, Info Controller: ${err}`)
        }
    }
}

export default new InfoController