const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
            <div class="info">
                <img src="${user.avatarUrl}" alt="foto do perfil do usuário" />
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                    <h3>Seguindo: ${user.following}</h3>
                    <h3>Seguidores: ${user.followers}</h3>
                </div>
            </div>`;

        let repositoriesItens = '';
        user.repositories.forEach(repo => {
            repositoriesItens += `
                <li class="repo-item">
                    <a class="repo-name">${repo.name.toUpperCase()}</a>
                    <div class="repo-info">
                        <span class="repo-stat">
                            <i class="fas fa-code-branch"></i> ${repo.forks}
                        </span>
                        <span class="repo-stat">
                            <i class="fas fa-star"></i> ${repo.stars}
                        </span>
                        <span class="repo-stat">
                            <i class="fas fa-eye"></i> ${repo.watchers}
                        </span>
                        <span class="repo-language">
                            <i class="fas fa-laptop-code"></i> ${repo.language ?? 'N/A'}
                        </span>
                    </div>
                </li>`;
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul class="repo-list">${repositoriesItens}</ul>
                </div>`;
        }

        let eventItens = '';
        if (user.events && user.events.length > 0) {
            user.events.forEach(event => {
                if (event.type === 'PushEvent') {
                    eventItens += `<li><span class="name-repos">${event.repo.name}</span> - ${event.payload.commits[0].message}</li>`;
                } else if (event.type === 'CreateEvent') {
                    eventItens += `<li><span class="name-repos">${event.repo.name}</span> - Sem mensagem de commit</li>`;
                }
            });

            this.userProfile.innerHTML += `
                <div class="events section">
                    <h2>Eventos</h2>
                    <ul>${eventItens}</ul>
                </div>`;
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };
