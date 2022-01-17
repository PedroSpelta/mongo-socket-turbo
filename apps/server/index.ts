// import express, { request, Request, Response } from "express";
import { MongoClient } from "mongodb";
import { getAllUsers } from "./controllers/productController";
import * as express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hey ab" });
});

httpServer.listen(PORT, () => {
  console.log(`[express]: running on ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://mongotest.spelta.dev",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const mongoUri =
  "mongodb+srv://Spelta:gsX9R8yep8khJXf@demeter.mgjk1.mongodb.net/users?retryWrites=true&w=majority";

const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);
mongoClient
  .connect()
  .then((result) => {

    console.log("mongo connected!");
    const collection = result.db("users").collection("data");
    const stream = collection.watch([]);
    stream.on("change", (next) => {
      console.log("change");
      io.emit("stream", next);
    });
  })
  .catch((err) => console.log(err));

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
