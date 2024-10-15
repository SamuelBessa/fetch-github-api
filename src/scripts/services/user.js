import { baseUrl } from '../variables.js';

async function getUser(userName) {
    try {
        const response = await fetch(`${baseUrl}/${userName}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuário: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getUser };

