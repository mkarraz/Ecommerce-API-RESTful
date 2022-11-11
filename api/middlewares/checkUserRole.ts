import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'

const checkUserRole = (req:any, res: any, next: NextFunction) => {
	const user = req.user
  try {

		if (user.isAdmin === 'true') return next()
		return res.json({ error: 'Acces denied' , descripcion: `You do not have permission to access to ${req.originalUrl}`, code: '403'})

	} catch (err) {
		Logger.error(`Error has occured when checkUserAuth method, ${err}`)
	}
}
export default checkUserRole