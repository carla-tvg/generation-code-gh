import fetch from 'node-fetch';
import { getServerURL } from './task1.js';
 
export async function listUsers() {
    const url = `${getServerURL()}/users`;  // Usa comillas invertidas para interpolación de variables
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const users = await response.json();
 
        const formattedUsers = users.map(user =>
            `{\n  id: ${user.id},\n  first_name: '${user.first_name}',\n  last_name: '${user.last_name}',\n  email: '${user.email}'\n}`
        ).join(',\n');
 
        console.log(`[\n${formattedUsers}\n]`);  // Usa comillas invertidas para el formato final
        return users;
    } catch (error) {
        console.error('Error listing users:', error);
    }
}