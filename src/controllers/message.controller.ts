import { Router, Request, Response } from 'express';
import { AppRoute } from '../models/app-route';
import { Message } from '../models/message';
import { Image, Text, Video } from '../models/content';
import { Content } from '../models/content/content';
import { User } from '../models/user';
import { tokenValidation, validateLoggedUser } from '../models/authentication/token';
import { sendResponse, Status } from '../models/helpers/responses';

export class MessageController implements AppRoute {
    public route = '/messages';
    public router: Router = Router();

    // Constructor
    public constructor() {
        this.router.post('/', tokenValidation, this.send);
        this.router.get('/', [tokenValidation, validateLoggedUser], this.get);
    }

    /**
     * Send a message from one user to another. 
     * We support three types of messages `text`, `image` and `video` 
     */
    public async send(request: Request, response: Response): Promise<void> {
        try {
            const senderId: number = request.body.sender;
            const recipientId: number = request.body.recipient;
            const type: string = request.body.content.type;
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
            await message.send();
            sendResponse(response, Status.OK, { id: message.id, timestamp: message.timestamp });
        } catch (err) {
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }

    /**
     * Fetch all existing messages to a given recipient, within a range of message IDs.
     */
    public async get(request: Request, response: Response): Promise<void> {
        try {
            const recipientId: number = request.body.recipient;
            const startId: number = request.body.start;
            const limit: number = request.body.limit;
            const user: User = new User('', '');
            user.id = recipientId;
            const messages: Message[] = await user.getReceivedMessages(startId, limit);
            sendResponse(response, Status.OK, { 'messages': messages });
        } catch (err) {
            sendResponse(response, Status.SERVER_ERROR, { err: err.message });
        }
    }
}
