import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const DB_CONN_STRING = String(process.env.DB_CONN_STRING);
const DB_NAME = String(process.env.DB_NAME);
const BOOK_COLLECTION_NAME = String(process.env.BOOK_COLLECTION_NAME);

// Find Query
export async function findAllBooks(page: number = 1) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const booklist = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find({})
      .skip((page - 1) * 12)
      .limit(12)
      .toArray();
    const bookcnt = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find({})
      .count();
    return {
      booklist: booklist,
      bookcnt: bookcnt
    };
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findBooksByKeyword(keyword: string, page: number = 1) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const regex = eval("/" + keyword + "/i");
    const query = {
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } },
        { publisher: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
        { release: { $regex: regex } },
        { tags: { $elemMatch: { $eq: keyword } } },
      ]
    };
    const booklist = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find(query)
      .skip((page - 1) * 12)
      .limit(12)
      .toArray();
    const bookcnt = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find(query)
      .count();
    return {
      booklist: booklist,
      bookcnt: bookcnt
    };
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findBooksByTags(tags: Array<string>, page: number = 1) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const query = { tags: { $all: tags } };
    const booklist = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find(query)
      .skip((page - 1) * 12)
      .limit(12)
      .toArray();
    const bookcnt = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find(query)
      .count();
    return {
      booklist: booklist,
      bookcnt: bookcnt
    };
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findBooks(tags: Array<string>, keyword: string = "", page: number = 1) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const regex = eval("/" + keyword + "/i");
    const query = {
      $and: [
        { tags: { $all: tags } },
        {
          $or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            { publisher: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { release: { $regex: regex } },
            { tags: { $elemMatch: { $eq: keyword } } },
          ]
        }
      ]
    };
    const booklist = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find(query)
      .skip((page - 1) * 12)
      .limit(12)
      .toArray();
    const bookcnt = await client.db(DB_NAME)
      .collection(BOOK_COLLECTION_NAME)
      .find(query)
      .count();
    return {
      booklist: booklist,
      bookcnt: bookcnt
    };
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// Find One
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
