import { Request, Response, NextFunction } from 'express';
import { sendResponse, Status } from '../helpers';
import { User } from '../';

// Middleware
export const validateConfigToGetMessages = (request: Request, response: Response, next: NextFunction): any => {
    if (request.body.recipient !== undefined && request.body.recipient !== request.userId) {
        return sendResponse(response, Status.UNAUTHORIZED, 'Access denied');
    }
    next();
};

export const validateConfigToSendMessages = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    if (request.body.sender !== request.userId) {
        return sendResponse(response, Status.UNAUTHORIZED, 'You are not allowed to perform this action');
    }
    if (request.body.recipient === request.userId) {
        return sendResponse(response, Status.UNSUPPORTED_ACTION, 'Cannot send a message to yourself');
    }
    try {
        let recipient: User = new User('', '');
        recipient.id = request.body.recipient;
        recipient = await recipient.getUserById();
    } catch (error) {
        return sendResponse(response, Status.NOT_FOUND, 'The user to send the message does not exist');
    }
    next();
};