import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse, Status } from '../helpers';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

// Middleware to validate the received JWT
export const tokenValidation = (request: Request, response: Response, next: NextFunction): any => {
    try {
        const token = request.header('Authorization');
        if (!token) return sendResponse(response, Status.UNAUTHORIZED, 'Access denied');
        const payload: IPayload = jwt.verify(token, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN_SECRET') as IPayload;
        request.userId = payload.id;
        next();
    } catch (err) {
        return sendResponse(response, Status.UNAUTHORIZED, 'Access denied');
    }
};

// Generate JWT
export const getToken = (userId: number): string => {
    return jwt.sign({ id: userId }, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN_SECRET', {
        // 1 hour
        expiresIn: 60 * 60 * 24
    });
};
