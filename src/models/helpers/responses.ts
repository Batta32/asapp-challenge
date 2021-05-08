import { Response } from 'express';

export const Status = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    VALIDATION_FAILED: 422,
    SERVER_ERROR: 500,
    CREATED: 201,
};

export const sendResponse = (response: Response, status: number, content: any): void => {
    response.status(status).send(content);    
};