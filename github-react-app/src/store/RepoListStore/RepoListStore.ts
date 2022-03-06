import { HTTPMethod } from "@rootStore/ApiStore/types";
import rootStore from "@rootStore/instance";
import {
    CollectionModel,
    getInitialCollectionModel,
    linearizeCollection,
    normalizeCollection,
} from "@sharedModels/collection";
import { normalizeRepoItem, RepoItemApi, RepoItemModel } from "@store/models";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
    action,
    computed,
    makeObservable,
    observable,
    runInAction,
} from "mobx";

import { GetOrganizationReposListParams, PrivateFields } from "./types";

export default class RepoListStore implements ILocalStore {
    private _list: CollectionModel<string, RepoItemModel> =
        getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RepoListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getRepoList: action,
        });
    }

    get list(): RepoItemModel[] {
        return linearizeCollection(this._list);
    }
    get meta(): Meta {
        return this._meta;
    }

    async getRepoList(params: GetOrganizationReposListParams): Promise<void> {
        if (params.refresh === undefined) params.refresh = false;
        if (params.refresh) this._list = getInitialCollectionModel();
        this._meta = Meta.loading;

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

        runInAction(() => {
            try {
                if (response.success) {
                    this._meta = Meta.success;

                    let list: RepoItemModel[] = this.list;
                    if (params.refresh) list = [];

                    for (let i = 0; i < response.data.length; i++) {
                        list.push(normalizeRepoItem(response.data[i]));
                    }
                    this._list = normalizeCollection(list, (item) => item.id);
                } else {
                    this._list = getInitialCollectionModel();
                    this._meta = Meta.error;
                }
            } catch (e) {
                this._list = getInitialCollectionModel();
                this._meta = Meta.error;
            }
        });
    }

    destroy(): void {
        this._list = getInitialCollectionModel();
    }
}
