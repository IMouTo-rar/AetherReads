import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const DB_CONN_STRING = String(process.env.DB_CONN_STRING);
const DB_NAME = String(process.env.DB_NAME);
const USER_COLLECTION_NAME = String(process.env.USER_COLLECTION_NAME);

// #region FindOne User
export async function findUserById(id:number) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const query = { id: id };
    const user = await client.db(DB_NAME)
      .collection(USER_COLLECTION_NAME)
      .findOne(query)
    return user;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findUserByUsername(username:string) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const query = { username: username };
    const user = await client.db(DB_NAME)
      .collection(USER_COLLECTION_NAME)
      .findOne(query)
    return user;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findUserByPhone(phone:string) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const query = { phone: phone };
    const user = await client.db(DB_NAME)
      .collection(USER_COLLECTION_NAME)
      .findOne(query)
    return user;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

export async function findUserByEmail(email:string) {
  const client = new MongoClient(DB_CONN_STRING);
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB');
    const query = { email: email };
    const user = await client.db(DB_NAME)
      .collection(USER_COLLECTION_NAME)
      .findOne(query)
    return user;
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}
// #endregion