// Здесь необходимо продемонстрировать создание и использование GitHubStore

import GitHubStore from '../store/GitHubStore/GitHubStore';

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.getOrganizationReposList({
  organizationName: EXAMPLE_ORGANIZATION
}).then(result => {
  console.log(result); // в консоли появится список репозиториев в ktsstudio
})

gitHubStore.postOrganizationRepo({
    organizationName: "test-organizationnn",
    repoName: "testrepositor",
    oauthToken: "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",
    private: true
  }).then(result => {
    console.log(result); 
  });
// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
