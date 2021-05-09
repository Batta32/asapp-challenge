import express, { Router } from 'express';
import { json, urlencoded } from 'body-parser';
import { AppRouting } from './server';
import * as dotenv from 'dotenv';

// Config to read env variables
dotenv.config();

// Initialize Express server in PORT 8080 by default
const app = express();
const port = process.env.PORT || 8080;
const router: Router = express.Router();

app.use((request, response, next) => {
    if (request.url === '/') {
        response.status(200);
    } else {
        next();
    }
});
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));

// Initialize all the defined controllers
app.use('/', router);
new AppRouting(router);

// Listen server
app.listen(port, () => {
    console.log(`ASAPP Challenge app running on port ${ port }`);
});
