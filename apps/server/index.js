"use strict";
exports.__esModule = true;
// import express, { request, Request, Response } from "express";
var mongodb_1 = require("mongodb");
var express = require("express");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var PORT = process.env.PORT || 3001;
var app = express();
var httpServer = (0, http_1.createServer)(app);
app.get("/", function (req, res) {
    return res.status(200).json({ message: "hey" });
});
httpServer.listen(PORT, function () {
    console.log("[express]: running on ".concat(PORT));
});
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "https://mongotest.spelta.dev",
        methods: ["GET", "POST"]
    }
});
io.on("connection", function (socket) {
    console.log("Client connected");
    socket.on("disconnect", function () { return console.log("Client disconnected"); });
});
var mongoUri = "mongodb+srv://Spelta:gsX9R8yep8khJXf@demeter.mgjk1.mongodb.net/users?retryWrites=true&w=majority";
var mongoClient = new mongodb_1.MongoClient(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoClient
    .connect()
    .then(function (result) {
    console.log("mongo connected!");
    var collection = result.db("users").collection("data");
    var stream = collection.watch([]);
    stream.on("change", function (next) {
        console.log("change");
        io.emit("stream", next);
    });
})["catch"](function (err) { return console.log(err); });
// const client = new MongoClient(mongoUri);
// client.connect().catch((e) => console.log(e));
// client.once("open", () => {
//   console.log("Mongo Connected");
//   const collection = client.db("users").collection("data");
//   const stream = collection.watch([]);
//   stream.on("change", (next) => {
//     console.log("change");
//     io.emit("stream", next);
//   });
// });
// setInterval(() => io.emit("time", new Date().toTimeString()), 1000);
// const server = express()
//   .use((req: any, res:any) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
// const io = socketIO(server);
// async function main() {
//   const collection = client.db("users").collection("data");
//   const changeStream = collection.watch([]);
//   changeStream.on("change", (next) => {
//     console.log("change");
//     console.log(next);
//   });
// }
// main().catch(console.error);
