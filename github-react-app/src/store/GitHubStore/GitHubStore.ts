import ApiStore from '../../shared/store/ApiStore';
import {ApiResp, GetOrganizationReposListParams, IGitHubStore} from "./types";

import { HTTPMethod } from "../../shared/store/ApiStore/types";
import { RepoItem } from './types';

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com"); // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
        return await this.apiStore.request({
            method: HTTPMethod.GET, 
            headers: {"Accept": "application/vnd.github.v3+json"},
            endpoint: `/orgs/${params.organizationName}/repos`,
            data: {}
        }).then();
    }
}
