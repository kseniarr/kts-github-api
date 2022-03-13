import React, { useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.scss";
import { RepoItem } from "@store/GitHubStore/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import { useReposContext } from "../ReposContext";

const ReposSearchPage = () => {
    const monthNames: string[] = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const reposContext = useReposContext();
    const [inputValue, setInputValue] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const onChangeInput = (value: string) => {
        setInputValue(value);
        setPage(1);
        setHasMore(true);
    };

    const [isLoading, setIsLoading] = useState(false);
    const perPage = 30;
    const [page, setPage] = useState(1);

    const nagivate = useNavigate();

    const onSearchBtnClick = async () => {
        setIsLoading(true);
        reposContext.isLoading = true;

        const response = await reposContext.load(inputValue, page, perPage);
        const arr = response;
        reposContext.list = arr?.map((x: any): RepoItem => {
            return {
                id: x.id,
                repoName: x.name,
                orgName: x.owner.login,
                organizationUrl: x.owner.html_url,
                numStars: x.stargazers_count,
                lastUpdated: `Updated ${new Date(x.updated_at).getDate()} ${
                    monthNames[new Date(x.updated_at).getMonth()]
                }`,
                repoUrl: x.url,
                avatarUrl: x.owner.avatar_url,
            };
        });

        setIsLoading(false);
        reposContext.isLoading = false;
        if (
            reposContext.list === undefined ||
            reposContext.list.length === 0 ||
            reposContext.list.length < 30
        )
            setHasMore(false);
    };

    const fetchData = async () => {
        setPage(page + 1);
        const response = await reposContext.load(inputValue, page + 1, perPage);
        const newArr = response.map((x: any): RepoItem => {
            return {
                id: x.id,
                repoName: x.name,
                orgName: x.owner.login,
                organizationUrl: x.owner.html_url,
                numStars: x.stargazers_count,
                lastUpdated: `Updated ${new Date(x.updated_at).getDate()} ${
                    monthNames[new Date(x.updated_at).getMonth()]
                }`,
                repoUrl: x.url,
                avatarUrl: x.owner.avatar_url,
            };
        });
        reposContext.list = [...reposContext.list, ...newArr];
        if (response.length === 0 || response.length <= 30) setHasMore(false);
    };
    return (
        <>
            <div className="repos-list">
                <div className="search-bar">
                    <Input
                        value={inputValue}
                        onChange={(value: string) => onChangeInput(value)}
                    />
                    <Button onClick={onSearchBtnClick} disabled={isLoading}>
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
                    {reposContext.list !== undefined ? (
                        reposContext.list?.map((repo) => {
                            return (
                                <React.Fragment key={repo.id}>
                                    <RepoTile
                                        item={repo}
                                        onClick={() => {
                                            nagivate(`/repos/${repo.repoName}`);
                                        }}
                                    />
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <div className="repos-list__error-msg">
                            Репозиториев не найдено!
                        </div>
                    )}
                </InfiniteScroll>
            </div>
            {
                <RepoBranchesDrawer
                    onClose={() => {
                        nagivate("/repos");
                    }}
                />
            }
        </>
    );
};

export default ReposSearchPage;
