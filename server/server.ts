
import * as express from 'express';
import {Application} from "express";
import {readAllLessons} from "./read-all-lessons.route";
const bodyParser = require('body-parser');



const app: Application = express();


app.use(bodyParser.json());


// REST API
app.route('/api/lessons')
    .get(readAllLessons);


// launch an HTTP Server bound to IPv4 localhost to avoid port conflicts
const httpServer:any = app.listen(9001, '127.0.0.1', () => {
    const addr = httpServer.address();
    const port = addr && addr.port ? addr.port : 9001;
    console.log("HTTP Server running at http://127.0.0.1:" + port);
});

httpServer.timeout = 60000;







