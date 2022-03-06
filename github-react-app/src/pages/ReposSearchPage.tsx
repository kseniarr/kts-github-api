import React, { useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoList from "@components/RepoList";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.scss";
import RepoListStore from "@store/RepoListStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const ReposSearchPage = () => {
    const [inputValue, setInputValue] = useState("");
    const onChangeInput = (value: string) => {
        setInputValue(value);
        setPage(1);
        setHasMore(true);
    };

    const [isLoading, setIsLoading] = useState(Meta.initial);
    const [page, setPage] = useState(1);
    const perPage = 30;
    const [hasMore, setHasMore] = useState(true);

    const nagivate = useNavigate();
    const repoListStore = useLocalStore(() => new RepoListStore());
    const [repos, setRepos] = useState(repoListStore);

    const onSearchBtnClick = React.useCallback(async () => {
        setIsLoading(Meta.loading);
        await repoListStore.getRepoList({
            organizationName: inputValue,
            perPage: perPage,
            page: page,
            refresh: true,
        });
        setRepos(repoListStore);

        if (repoListStore.list.length === 0 || repoListStore.list.length < 30)
            setHasMore(false);

        setIsLoading(repoListStore.meta);
    }, [inputValue, page, repoListStore]);

    const fetchData = React.useCallback(async () => {
        setPage(page + 1);
        repoListStore.getRepoList({
            organizationName: inputValue,
            perPage: perPage,
            page: page + 1,
        });
        setRepos(repoListStore);
        if (repoListStore.list.length === 0 || repoListStore.list.length <= 30)
            setHasMore(false);
    }, [inputValue, page, repoListStore]);

    return (
        <>
            <div className="repos-list">
                <div className="search-bar">
                    <Input
                        value={inputValue}
                        onChange={(value: string) => onChangeInput(value)}
                    />
                    <Button
                        onClick={onSearchBtnClick}
                        disabled={isLoading === Meta.loading}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <InfiniteScroll
                    dataLength={perPage}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<></>}
                    endMessage={<></>}
                >
                    <RepoList list={repos.list} isLoading={isLoading} />
                </InfiniteScroll>
            </div>
            {
                <RepoBranchesDrawer
                    orgName={inputValue}
                    onClose={() => {
                        nagivate("/repos");
                    }}
                />
            }
        </>
    );
};

export default observer(ReposSearchPage);
