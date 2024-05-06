/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
    findAllBooks,
    findBookById,
} from "~/services/database.books.server";

export async function serverFindAllBooks() {
    return findAllBooks();
}

export async function serverFindBookById(id:number) {
    return findBookById(id);
}