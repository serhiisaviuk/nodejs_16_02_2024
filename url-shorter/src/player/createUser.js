import fetch from 'node-fetch';
import {deleteU} from "./userDb.js";

// createUser.js
export const createUser = async () => {
    const response = await fetch('http://website.com/users', {method: 'POST'});
    const userId = await response.text();
    return userId;
};


export function deleteUser(name){
    const result = deleteU(name);
    return result;
}


