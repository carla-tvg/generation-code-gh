import fetch from 'node-fetch';
import { getServerURL } from './task1.js';

export async function delUser(id) {
    const url = `${getServerURL()}/users/${id}`;

    try {
        const deleteResponse = await fetch(url, {
            method: 'DELETE',
        });

        if (deleteResponse.status === 404) {
            console.error(`Error deleting user: Not Found`);
            return;
        } else if (!deleteResponse.ok) {
            throw new Error(`Error deleting user: ${deleteResponse.statusText}`);
        }

        console.log(`User with id ${id} deleted successfully.`);

        // Obtener la lista actualizada de usuarios
        const usersResponse = await fetch(`${getServerURL()}/users`);
        if (!usersResponse.ok) {
            throw new Error(`Error fetching users: ${usersResponse.statusText}`);
        }
        const users = await usersResponse.json();

        // Formatear los usuarios en el formato esperado
        const formattedUsers = users.map(user =>
            `  { \n    id: ${user.id},\n    first_name: '${user.first_name}',\n    last_name: '${user.last_name}',\n    email: '${user.email}' \n  }`
        ).join(',\n');

        // Imprimir la lista de usuarios con el formato correcto
        const formattedOutput = `[\n${formattedUsers}\n]`;
        console.log(formattedOutput);

        return formattedOutput;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
