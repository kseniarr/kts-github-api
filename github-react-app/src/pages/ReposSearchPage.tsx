import React, { useState } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import { gitStore } from "@root/root";
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
    const onChangeInput = (value: string) => {
        setInputValue(value);
    };

    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState<RepoItem[]>();
    const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

    const onSearchBtnClick = async () => {
        setIsLoading(true);

        const response = await gitStore.getOrganizationReposList({
            organizationName: inputValue,
        });
        const arr = response.data;

        setRepos(
            arr.map((x: any): RepoItem => {
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
            })
        );

        setIsLoading(false);
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
                {repos?.map((repo) => {
                    return (
                        <React.Fragment key={repo.id}>
                            <RepoTile
                                item={repo}
                                onClick={() => setSelectedRepo(repo)}
                            />
                        </React.Fragment>
                    );
                })}
            </div>
            {selectedRepo !== null && (
                <RepoBranchesDrawer
                    selectedRepo={selectedRepo}
                    onClose={() => setSelectedRepo(null)}
                />
            )}
        </>
    );
};

export default ReposSearchPage;
