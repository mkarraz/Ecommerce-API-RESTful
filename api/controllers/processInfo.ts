import { Request, Response } from 'express'
import os from 'os'

const renderProcessInfo = (req: Request, res: Response) => {
  /* const { email } = req.user as any */
  const cpuQty: Number = os.cpus().length

  const infoDisplayed = {
    numberOfProcessors: cpuQty,
    title: process.argv,
    arguments: process.argv,
    system: process.platform,
    version: process.version,
    memory: process.memoryUsage.rss(),
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
  }

  console.log(infoDisplayed)
  return res.render('info', infoDisplayed)

}

export default renderProcessInfo