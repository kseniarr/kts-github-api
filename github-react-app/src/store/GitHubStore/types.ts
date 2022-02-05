/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;
}

export type GetOrganizationReposListParams = {
    organizationName: string;
}

export type PostOrganizationRepoParams = {
    organizationName: string;
    repoName: string;
    oauthToken: string;
    private: boolean;
}

export type RepoItem = {
    id: string,
    repo_name: string;
    org_name: string;
    num_stars: number;
    last_updated: Date;
    url: string;
}

export type ApiResp<T> = 
{
    repos: T[];
}