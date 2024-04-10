import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const DB_CONN_STRING = String(process.env.DB_CONN_STRING);
// const DB_NAME = String(process.env.DB_NAME);
// const XXX_COLLECTION_NAME = String(process.env.XXX_COLLECTION_NAME);

export async function funcName(/* parama */) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}