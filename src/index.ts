import express, { Router } from 'express';
import { json, urlencoded } from "body-parser";
import { AppRouting } from './server/app.routing';

const app = express();
const port = process.env.PORT || 8080;
const router: Router = express.Router();

app.use((request, response, next) => {
    if (request.url === "/") {
        response.status(200);
    } else {
        next();
    }
});
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

app.use("/", router);
new AppRouting(router);

app.listen(port, () => {
    console.log(`ASAPP Challenge app running on port ${port}`);
});