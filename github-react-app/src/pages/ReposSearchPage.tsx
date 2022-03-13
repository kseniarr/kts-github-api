import React, { useCallback } from "react";

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
    const nagivate = useNavigate();
    const repoListStore = useLocalStore(() => new RepoListStore());

    return (
        <>
            <div className="repos-list">
                <div className="search-bar">
                    <Input
                        value={repoListStore.inputValue}
                        onChange={useCallback(
                            (value: string) =>
                                repoListStore.onChangeInput(value),
                            [repoListStore]
                        )}
                    />
                    <Button
                        onClick={repoListStore.onSearchBtnClick}
                        disabled={repoListStore.meta === Meta.loading}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <InfiniteScroll
                    dataLength={repoListStore.perPage}
                    next={repoListStore.fetchData}
                    hasMore={repoListStore.hasMore}
                    loader={<></>}
                    endMessage={<></>}
                >
                    <RepoList
                        list={repoListStore.list}
                        isLoading={repoListStore.meta}
                    />
                </InfiniteScroll>
            </div>
            {
                <RepoBranchesDrawer
                    orgName={repoListStore.inputValue}
                    onClose={useCallback(() => {
                        nagivate("/repos");
                    }, [])}
                />
            }
        </>
    );
};

export default observer(ReposSearchPage);
