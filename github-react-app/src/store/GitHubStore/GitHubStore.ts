import ApiStore from "@ApiStore/ApiStore";
import { ApiResponse, HTTPMethod } from "@ApiStore/types";

import {
    getOrganizationRepoBranchesListParams,
    GetOrganizationReposListParams,
    IGitHubStore,
    PostOrganizationRepoParams,
    RepoBranches,
} from "./types";
import { RepoItem } from "./types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com"); // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<ApiResponse<RepoItem[], any>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
        const response = await this.apiStore.request<RepoItem[]>({
            method: HTTPMethod.GET,
            headers: { Accept: "application/vnd.github.v3+json" },
            endpoint: `/orgs/${params.organizationName}/repos?per_page=${params.perPage}&page=${params.page}`,
            data: {
                org: params.organizationName,
                per_page: params.perPage,
                page: params.page,
            },
        });
        return {
            success: response.success,
            data: response.data,
            status: response.status,
        };
    }

    async postOrganizationRepo(
        params: PostOrganizationRepoParams
    ): Promise<ApiResponse<RepoItem[], any>> {
        const response = await this.apiStore.request<RepoItem[]>({
            method: HTTPMethod.POST,
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `token ${params.oauthToken}`,
            },
            endpoint: `/orgs/${params.organizationName}/repos`,
            data: {
                org: params.organizationName,
                name: params.repoName,
                private: params.private,
            },
        });
        return {
            success: response.success,
            data: response.data,
            status: response.status,
        };
    }

    async getOrganizationRepoBranchesList(
        params: getOrganizationRepoBranchesListParams
    ): Promise<ApiResponse<RepoBranches[], any>> {
        const response = await this.apiStore.request({
            method: HTTPMethod.GET,
            headers: { Accept: "application/vnd.github.v3+json" },
            endpoint: `/repos/${params.organizationName}/${params.repoName}/branches`,
            data: {
                orgName: params.organizationName,
                repoName: params.repoName,
            },
        });
        return {
            success: response.success,
            data: response.data,
            status: response.status,
        };
    }
}
