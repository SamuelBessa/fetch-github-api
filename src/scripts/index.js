import { getRepositories } from './services/repositories.js';
import { fetchGitHubEvents } from './services/repositories.js';
import { getUser } from './services/user.js';
import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return;
        getUserData(userName);
    }
});

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
    return false;
};

async function getUserData(userName) {
    try {
        const userResponse = await getUser(userName);

        if (!userResponse || userResponse.message === "Not Found") {
            screen.renderNotFound();
            return;
        }

        const repositoriesResponse = await getRepositories(userName);
        const eventsResponse = await fetchGitHubEvents(userName);

        const updatedRepositories = repositoriesResponse.map(repo => ({
            name: repo.name,
            forks: repo.forks_count,
            stars: repo.stargazers_count,
            watchers: repo.watchers_count,
            language: repo.language,
            html_url: repo.html_url
        }));

        user.setInfo(userResponse);
        user.setRepositories(updatedRepositories);
        user.setEvents(eventsResponse);

        screen.renderUser(user);
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
    }
};

