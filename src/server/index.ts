const express = require("express");
import { WebSocket } from "ws";
import * as path from "path";
import { Application } from "express-ws";

import { createServer } from "https";
import * as fs from "fs";

const app: Application = express();
app.use(express.static(path.join(__dirname, "../../public")));

const server = createServer(
    /*{
        cert: fs.readFileSync("/etc/letsencrypt/live/server.natehroylance.com/cert.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/server.natehroylance.com/privkey.pem"),
    },*/
    app,
);
const wss = new WebSocket.Server({ server });

wss.on("connection", function (ws) {
    const id = setInterval(function () {
        ws.send(JSON.stringify(process.memoryUsage()), function () {
            //
            // Ignore errors.
            //
        });
    }, 100);
    console.log("started client interval");

    ws.on("close", function () {
        console.log("stopping client interval");
        clearInterval(id);
    });
});

server.listen(3000, function () {
    console.log("Listening on http://localhost:3000");
});
