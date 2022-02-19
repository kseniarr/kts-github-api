/* eslint-disable no-console */
// Здесь необходимо продемонстрировать создание и использование GitHubStore

import GitHubStore from "@store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

// gitHubStore
//     .getOrganizationReposList({
//         organizationName: EXAMPLE_ORGANIZATION,
//     })
//     .then((result) => {
//         console.log(result); // в консоли появится список репозиториев в ktsstudio
//     });

// gitHubStore
//     .getOrganizationRepoBranchesList({
//         organizationName: "ktsstudio",
//         repoName: "notific",
//     })
//     .then((result) => {
//         console.log(result);
//     });
// gitHubStore
//     .postOrganizationRepo({
//         organizationName: "test-organizationnn",
//         repoName: "testrpoitr",
//         oauthToken: "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",
//         private: true,
//     })
//     .then((result) => {
//         console.log(result);
//     });
// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
