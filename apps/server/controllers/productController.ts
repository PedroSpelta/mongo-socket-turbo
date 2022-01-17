import { Request, Response } from "express";
import { connection } from "../model/connection";

export const getAllUsers = async (req: Request, res: Response) => {
  const conn = await connection();
  const query = await conn.collection("data").find({}).toArray();
  console.log(query);
  
  res.json( query );
};
