import React from "react";

import RepoTile from "@components/RepoTile";
import { RepoItemModel } from "@store/models";
import { Meta } from "@utils/meta";
import { useNavigate } from "react-router-dom";

type RepoListProps = {
    list: RepoItemModel[];
    isLoading: Meta;
};

const RepoList: React.FC<RepoListProps> = ({ list, isLoading }) => {
    const nagivate = useNavigate();
    return (
        <>
            {list?.map((repo) => {
                return (
                    <React.Fragment key={repo.id}>
                        <RepoTile
                            item={repo}
                            onClick={() => nagivate(`/repos/${repo.repoName}`)}
                        />
                    </React.Fragment>
                );
            })}
            {isLoading === Meta.error && (
                <div className="repos-list___error-msg">
                    Репозиториев не найдено!
                </div>
            )}
        </>
    );
};

export default React.memo(RepoList);
