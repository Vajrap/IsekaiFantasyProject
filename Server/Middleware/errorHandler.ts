// middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}
