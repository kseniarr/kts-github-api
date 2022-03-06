import { HTTPMethod } from "@rootStore/ApiStore/types";
import rootStore from "@rootStore/instance";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection,
} from "@sharedModels/collection";
import {
    normalizeRepoBranches,
    RepoBranchesApi,
    RepoBranchesModel,
} from "@store/models";
import { Meta } from "@utils/meta";
import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";

import {
    getOrganizationRepoBranchesListParams,
    IRepoBranchesStore,
    PrivateFields,
} from "./types";

export default class RepoBranchesStore implements IRepoBranchesStore {
    private _branchesList: CollectionModel<string, RepoBranchesModel> =
        getInitialCollectionModel();
    private _orgName: string = "";
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RepoBranchesStore, PrivateFields>(this, {
            _branchesList: observable.ref,
            _meta: observable,
            _orgName: observable,
            branchesList: computed,
            orgName: computed,
            meta: computed,
            getOrganizationRepoBranchesList: action,
        });
    }

    get branchesList(): RepoBranchesModel[] {
        return linearizeCollection(this._branchesList);
    }

    get orgName(): string {
        return this._orgName;
    }

    get meta(): Meta {
        return this._meta;
    }

    destroy(): void {
        this._branchesList = getInitialCollectionModel();
    }

    async getOrganizationRepoBranchesList(
        params: getOrganizationRepoBranchesListParams
    ): Promise<void> {
        this._branchesList = getInitialCollectionModel();
        this._meta = Meta.loading;

        const response = await rootStore.apiStore.request<RepoBranchesApi[]>({
            method: HTTPMethod.GET,
            headers: { Accept: "application/vnd.github.v3+json" },
            endpoint: `/repos/${params.organizationName}/${params.repoName}/branches`,
            data: {
                orgName: params.organizationName,
                repoName: params.repoName,
            },
        });

        runInAction(() => {
            if (response.success) {
                try {
                    this._meta = Meta.success;
                    const list: RepoBranchesModel[] = [];
                    for (const item of response.data) {
                        list.push(normalizeRepoBranches(item));
                    }
                    this._branchesList = normalizeCollection(
                        list,
                        (item) => item.branchName
                    );
                } catch {
                    this._meta = Meta.error;
                }
            }
        });
    }
}
