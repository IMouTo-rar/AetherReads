/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    findUserById,
    findUserByUsername,
    findUserByPhone,
    findUserByEmail,
} from "~/services/database.users.server";

export async function UserLogin(username:string, password:string) {
    const user = await findUserByUsername(username);
    console.log(user)
    if (user == undefined || null) {
        console.log("username or password error");
        return null;
    }
    // TODO: Password Hash
    else if (password == user.password) {
        console.log("log in");
        return user;
    }
    else {
        console.log("username or password error");
        return null;
    }
}
