import { ApiResponse, HTTPMethod } from "@rootStore/ApiStore/types";
import rootStore from "@rootStore/instance";
import { RepoItemApi } from "@store/models";

import {
    GetOrganizationReposListParams,
    IGitHubStore,
    PostOrganizationRepoParams,
} from "./types";

export default class GitHubStore implements IGitHubStore {
    destroy(): void {
        // pass
    }

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<ApiResponse<RepoItemApi[], any>> {
        const response = await rootStore.apiStore.request<RepoItemApi[]>({
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
    ): Promise<ApiResponse<RepoItemApi[], any>> {
        const response = await rootStore.apiStore.request<RepoItemApi[]>({
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
}
