import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendResponse, Status } from '../helpers/responses';

interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

// Middleware
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

export const validateLoggedUser = (request: Request, response: Response, next: NextFunction): any => {
    if (request.body.recipient !== undefined && request.body.recipient !== request.userId) {
        return sendResponse(response, Status.UNAUTHORIZED, 'Access denied');
    }
    next();
};

export const getToken = (userId: number): string => {
    return jwt.sign({ id: userId }, process.env.TOKEN_SECRET || 'DEFAULT_TOKEN_SECRET', {
        // 1 hour
        expiresIn: 60 * 60 * 24
    });
};
