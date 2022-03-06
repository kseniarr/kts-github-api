import { ApiResponse } from "@rootStore/ApiStore/types";
import { RepoItemApi } from "@store/models";
import { ILocalStore } from "@utils/useLocalStore";

export interface IGitHubStore extends ILocalStore {
    getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<ApiResponse<RepoItemApi[], any>>;
}

export type GetOrganizationReposListParams = {
    organizationName: string;
    page: number;
    perPage: number;
};

export type PostOrganizationRepoParams = {
    organizationName: string;
    repoName: string;
    oauthToken: string;
    private: boolean;
};

export type PrivateFields = "_list" | "_meta";
