/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    findUserById,
    findUserByUsername,
    findUserByPhone,
    findUserByEmail,
} from "~/services/database.user.server";

export async function UserLogin(username:string, password:string ) {
    const user = await findUserByUsername(username);
    console.log(user)
    if (user == undefined || null) {
        console.log("username or password error");
        return null;
    }
    else if (password == user.password) {
        console.log("log in");
        return user.id;
    }
    else {
        console.log("username or password error");
        return null;
    }
}