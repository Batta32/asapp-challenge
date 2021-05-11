import { Request, Response, NextFunction } from 'express';
import { sendResponse, Status } from '../helpers';
import { User } from '../';

// Middleware with the conditions to get a message
export const validateConfigToGetMessages = (request: Request, response: Response, next: NextFunction): any => {
    // Check if the user to get the messages is the logged
    if (request.body.recipient !== request.userId) {
        return sendResponse(response, Status.UNAUTHORIZED, 'You are not allowed to perform this action');
    }
    next();
};

// Middleware with the conditions to send a message
export const validateConfigToSendMessages = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    // Check if the user to send the messages is the logged
    if (request.body.sender !== request.userId) {
        return sendResponse(response, Status.UNAUTHORIZED, 'You are not allowed to perform this action');
    }
    // Check if the user tries to send a message to himself
    if (request.body.recipient === request.userId) {
        return sendResponse(response, Status.UNSUPPORTED_ACTION, 'Cannot send a message to yourself');
    }
    // Check if the recipient user exists
    try {
        let recipient: User = new User('', '');
        recipient.id = request.body.recipient;
        recipient = await recipient.getUserById();
    } catch (error) {
        return sendResponse(response, Status.NOT_FOUND, 'The user to send the message does not exist');
    }
    next();
};
