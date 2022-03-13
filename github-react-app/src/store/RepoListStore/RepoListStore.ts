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

    private _inputValue: string = "";
    private _page: number = 1;
    private _hasMore: boolean = true;
    private _perPage: number = 30;

    constructor() {
        makeObservable<RepoListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _inputValue: observable,
            _page: observable,
            _hasMore: observable,
            list: computed,
            meta: computed,
            inputValue: computed,
            page: computed,
            hasMore: computed,
            perPage: computed,
            getRepoList: action,
        });
    }

    get list(): RepoItemModel[] {
        return linearizeCollection(this._list);
    }
    get meta(): Meta {
        return this._meta;
    }
    get inputValue(): string {
        return this._inputValue;
    }
    get page(): number {
        return this._page;
    }
    get hasMore(): boolean {
        return this._hasMore;
    }
    get perPage(): number {
        return this._perPage;
    }

    onChangeInput = (value: string) => {
        this._inputValue = value;
        this._page = 1;
        this._hasMore = true;
    };

    onSearchBtnClick = async () => {
        this._meta = Meta.loading;
        await this.getRepoList({
            organizationName: this._inputValue,
            perPage: this._perPage,
            page: this._page,
            refresh: true,
        });

        if (this.list.length === 0 || this.list.length < 30) {
            this._hasMore = false;
        }
    };

    fetchData = async () => {
        this._page += 1;
        await this.getRepoList({
            organizationName: this._inputValue,
            perPage: this._perPage,
            page: this._page,
        });
        if (this.list.length === 0 || this.list.length <= 30) {
            this._hasMore = false;
        }
    };

    async getRepoList(params: GetOrganizationReposListParams): Promise<void> {
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
            if (response.success) {
                this._meta = Meta.success;

                let list: RepoItemModel[] = this.list;

                const newList = response.data.map(normalizeRepoItem);
                if (params.refresh) {
                    this._list = normalizeCollection(
                        newList,
                        (item) => item.id
                    );
                } else {
                    this._list = normalizeCollection(
                        list.concat(newList),
                        (item) => item.id
                    );
                }
            } else {
                this._list = getInitialCollectionModel();
                this._meta = Meta.error;
            }
        });
    }

    destroy(): void {
        this._list = getInitialCollectionModel();
    }
}
