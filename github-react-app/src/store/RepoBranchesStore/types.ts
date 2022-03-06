import { ILocalStore } from "@utils/useLocalStore";

export type getOrganizationRepoBranchesListParams = {
    organizationName: string;
    repoName: string | undefined;
};

export interface IRepoBranchesStore extends ILocalStore {
    getOrganizationRepoBranchesList(
        params: getOrganizationRepoBranchesListParams
    ): Promise<void>;
}

export type PrivateFields = "_branchesList" | "_meta" | "_orgName";
