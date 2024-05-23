/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    findAllBooks,
    findBookById,
    findBooksByKeyword,
    findBooksByTags,
    findBooks,
} from "~/services/database.books.server";

export async function serverFindAllBooks(page: number = 1) {
    return findAllBooks(page);
}

export async function serverFindBookById(id: number) {
    return findBookById(id);
}

export async function serverFindBooksByKeyword(keyword: string, page: number = 1) {
    return findBooksByKeyword(keyword, page);
}

export async function serverFindBooksByTags(tags: Array<string>) {
    return findBooksByTags(tags);
}

export async function serverFindBooks(tags: Array<string> = [], keyword: string | null = "", page: number) {
    if (tags.length && keyword) {
        return findBooks(tags, keyword, page);
    }
    else if (keyword) {
        return findBooksByKeyword(keyword, page);
    }
    else if (tags.length) {
        return findBooksByTags(tags, page);
    }
    else{
        return findAllBooks(page);
    }
}

