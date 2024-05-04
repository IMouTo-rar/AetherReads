import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const DB_CONN_STRING = String(process.env.DB_CONN_STRING);
const DB_NAME = String(process.env.DB_NAME);
const BOOK_COLLECTION_NAME = String(process.env.BOOK_COLLECTION_NAME);

export async function findAllBooks() {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const book = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find({})
      .limit(20)
      .toArray();
    return book;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findBookById(id: number) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const query = { id: id };
    const book = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .findOne(query)
    return book;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}