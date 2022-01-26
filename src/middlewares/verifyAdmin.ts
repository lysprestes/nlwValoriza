import { Request, Response, NextFunction } from 'express';

export function verifyAdmin(request: Request, response: Response, next: NextFunction) {
  const admin = true;

  if(admin) {
    next();
  }

  return response.status(401).json({
    error: "You must be an admin to access this endpoint",
  });
};
