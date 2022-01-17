import * as mongoDB from "mongodb";
// require("dotenv").config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = "mongodb+srv://Spelta:gsX9R8yep8khJXf@demeter.mgjk1.mongodb.net?retryWrites=true&w=majority";
const MONGO_DB_NAME = "users";

// let db = null;

export const connection = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(MONGO_DB_URL);
  await client.connect();
  const db: mongoDB.Db = client.db(MONGO_DB_NAME);
  return db;
};
