import React, { useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

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

    const [inputValue, setInputValue] = useState("");
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState<RepoItem[]>();
    const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const onSearchBtnClick = async () => {
        setIsLoading(true);

        const gitStore = new GitHubStore();
        const arr = await gitStore
            .getOrganizationReposList({
                organizationName: inputValue,
            })
            .then((result) => result);

        setIsLoading(false);

        let newArr: RepoItem[] = [];
        for (let i = 0; i < arr.data.length; i++) {
            newArr[i] = {
                id: arr.data[i].id,
                repoName: arr.data[i].name,
                orgName: arr.data[i].owner.login,
                organizationUrl: arr.data[i].owner.html_url,
                numStars: arr.data[i].stargazers_count,
                lastUpdated: arr.data[i].updated_at,
                repoUrl: arr.data[i].url,
                avatarUrl: arr.data[i].owner.avatar_url,
            };
        }
        setRepos(newArr);
    };

    const selectRepo = (repo: RepoItem) => {
        setSelectedRepo(repo);
        showDrawer();
    };

    return (
        <>
            <div className="repos-list">
                <div className="search-bar">
                    <Input
                        value={inputValue}
                        placeholder="Введите название организации!"
                        onChange={onChangeInput}
                    />
                    <Button onClick={onSearchBtnClick} disabled={isLoading}>
                        <SearchIcon />
                    </Button>
                </div>
                {repos?.map((repo) => {
                    return (
                        <React.Fragment key={repo.id}>
                            <RepoTile
                                item={{
                                    repoName: repo.repoName,
                                    orgName: repo.orgName,
                                    numStars: repo.numStars,
                                    lastUpdated: `Updated ${new Date(
                                        repo.lastUpdated
                                    ).getDate()} ${
                                        monthNames[
                                            new Date(
                                                repo.lastUpdated
                                            ).getMonth()
                                        ]
                                    }`,
                                    repoUrl: repo.repoUrl,
                                    organizationUrl: repo.organizationUrl,
                                    id: repo.id,
                                    avatarUrl: repo.avatarUrl,
                                }}
                                onClick={() =>
                                    selectRepo({
                                        repoName: repo.repoName,
                                        orgName: repo.orgName,
                                        numStars: repo.numStars,
                                        lastUpdated: `Updated ${new Date(
                                            repo.lastUpdated
                                        ).getDate()} ${
                                            monthNames[
                                                new Date(
                                                    repo.lastUpdated
                                                ).getMonth()
                                            ]
                                        }`,
                                        repoUrl: repo.repoUrl,
                                        organizationUrl: repo.organizationUrl,
                                        id: repo.id,
                                        avatarUrl: repo.avatarUrl,
                                    })
                                }
                            />
                        </React.Fragment>
                    );
                })}
            </div>
            {isDrawerVisible && (
                <RepoBranchesDrawer
                    selectedRepo={selectedRepo}
                    onClose={onClose}
                    visible={isDrawerVisible}
                />
            )}
        </>
    );
};

export default ReposSearchPage;
