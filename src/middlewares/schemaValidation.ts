import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import fs from 'fs';
import path from 'path';

export const validate = (schema: ZodSchema<any>): any => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {

    //this part for remove the uploaded file
    if (req.file) {
      const filePath = path.join(__dirname, '../../uploads', req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete file:', err);
      });
    }

    return res.status(400).json({
      errors: result.error.flatten().fieldErrors
    });
  }


  req.body = result.data;
  next();
};