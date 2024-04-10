import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const DB_CONN_STRING = String(process.env.DB_CONN_STRING);
const DB_NAME = String(process.env.DB_NAME);
const SESSION_COLLECTION_NAME = String(process.env.SESSION_COLLECTION_NAME);

export async function createSession(data:JSON, expires:number) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const session = { data: data, expires: expires };
    const res = client
      .db(DB_NAME)
      .collection(SESSION_COLLECTION_NAME)
      .insertOne(session);
    return res;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}