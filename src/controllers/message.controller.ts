import { Router, Request, Response } from 'express';
import { AppRoute } from '../server';
import { User, Message } from '../models';
import { Content, Image, Text, Video } from '../models/content';
import { sendResponse, Status } from '../models/helpers';
import { tokenValidation, validateConfigToGetMessages, validateConfigToSendMessages } from '../models/middlewares';

/**
 * Controller to handle the actions of the messages
 */
export class MessageController implements AppRoute {

    // Main endpoint
    public route = '/messages';
    public router: Router = Router();

    // Constructor
    public constructor() {
        // POST: route endpoint to send messages to a user
        // Contains middleware to validate the token and the necessary conditions to send messages
        this.router.post('/', [tokenValidation, validateConfigToSendMessages], this.send);
        // GET: route endpoint to get the message of a user
        // Contains middlewares to validate the token and the necessary conditions to get messages
        this.router.get('/', [tokenValidation, validateConfigToGetMessages], this.get);
    }

    /**
     * Send a message from one user to another. 
     * We support three types of messages `text`, `image` and `video` 
     */
    public async send(request: Request, response: Response): Promise<void> {
        try {
            // Get the properties from the request
            const senderId: number = request.body.sender;
            const recipientId: number = request.body.recipient;
            const type: string = request.body.content.type;

            // Initialize specific content by request
            let content: Content;
            switch (type.toLowerCase()) {
                case 'text': {
                    content = new Text(request.body.content.text);
                    break;
                }
                case 'image': {
                    content = new Image(request.body.content.url, request.body.content.height, request.body.content.width);
                    break;
                }
                case 'video': {
                    content = new Video(request.body.content.url, request.body.content.source);
                    break;
                }
                default: {
                    throw new Error('Non-supported type');
                }
            }            
            const message: Message = new Message(senderId, recipientId, content);
            // Send message
            await message.send();
            // Send response
            sendResponse(response, Status.OK, { id: message.id, timestamp: message.timestamp });
        } catch (err) {
            // Send caught error
            sendResponse(response, Status.SERVER_ERROR, err.message);
        }
    }

    /**
     * Fetch all existing messages to a given recipient, within a range of message IDs.
     */
    public async get(request: Request, response: Response): Promise<void> {
        try {
            // Get the properties from the request
            const recipientId: number = request.body.recipient;
            const startId: number = request.body.start;
            // TODO: if this is not received it should be 100
            const limit: number = request.body.limit;
            const user: User = new User('', '');
            user.id = recipientId;
            // Get the messages of a user starting from an id and limiting the amount of messages
            const messages: Message[] = await user.getReceivedMessages(startId, limit);
            // Send response
            sendResponse(response, Status.OK, { 'messages': messages });
        } catch (err) {
            // Send caught error
            sendResponse(response, Status.SERVER_ERROR, err.message);
        }
    }
}
