/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

import { ApiResponse } from "@ApiStore/types";

export interface IGitHubStore {
    getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<ApiResponse<RepoItem[], any>>;
}

export type GetOrganizationReposListParams = {
    organizationName: string;
};

export type PostOrganizationRepoParams = {
    organizationName: string;
    repoName: string;
    oauthToken: string;
    private: boolean;
};

export type getOrganizationRepoBranchesListParams = {
    organizationName: string;
    repoName: string;
};

export type RepoItem = {
    id: string;
    repoName: string;
    orgName: string;
    numStars: number;
    lastUpdated: string;
    repoUrl: string;
    organizationUrl: string;
    avatarUrl: string;
};

export type RepoBranches = {
    name: string;
};
