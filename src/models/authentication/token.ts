import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

// Middleware
export const TokenValidation = (request: Request, response: Response, next: NextFunction): any => {
    const token = request.header('Authorization');
    if (!token) return response.status(401).json('Access denied');

    const payload: IPayload = jwt.verify(token, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN_SECRET') as IPayload;
    request.userId = payload.id;
    next();
};

export const getToken = (userId: number): string => {
    return jwt.sign({ id: userId }, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN_SECRET', {
        // 1 hour
        expiresIn: 60 * 60 * 24
    });
};
