import { Request, Response, NextFunction } from 'express'
import { newEntrySchema } from '../utils'

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newEntrySchema.parse(req.body)
    next()
  } catch (error: unknown) {
    next(error)
  }
}
