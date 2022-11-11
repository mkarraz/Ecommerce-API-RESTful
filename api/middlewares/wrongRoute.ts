import { Request, Response, NextFunction } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {

    res.status(404).json({
        status: 404,
        message: `Route: ${req.originalUrl}, not implemented.`,
        error: 'Not Found'
    })
}