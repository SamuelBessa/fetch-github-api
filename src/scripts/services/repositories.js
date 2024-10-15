import { baseUrl, repositoriesQuantity } from '../variables.js';

async function getRepositories(userName) {
    try {
        const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Erro ao buscar repositórios: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchGitHubEvents(userName) {
    try {
        const response = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Erro ao buscar eventos: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getRepositories, fetchGitHubEvents };
