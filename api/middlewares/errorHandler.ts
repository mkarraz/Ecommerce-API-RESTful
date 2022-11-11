import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    try {
        Logger.error(`An error has occured: ${err.message}`)
        return res.status(500).json({ error: 'An error has occured, captured by errorHandler' })

    } catch (err) {
        return res.status(500).json({ error: 'An error has occured, captured by errorHandler' })
    }
}
export default errorHandler