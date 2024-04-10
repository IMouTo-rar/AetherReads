import { 
    findAllBooks,
    findBookById,
} from "~/services/database.book.server";

export async function serverFindAllBooks() {
    return findAllBooks();
}

export async function serverFindBookById(id:number) {
    return findBookById(id);
}