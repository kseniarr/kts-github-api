import React from "react";

import RepoTile from "@components/RepoTile";
import { RepoItemModel } from "@store/models";
import { Meta } from "@utils/meta";

type RepoListProps = {
    list: RepoItemModel[];
    isLoading: Meta;
};

const RepoList: React.FC<RepoListProps> = ({ list, isLoading }) => {
    return (
        <>
            {list?.map((repo) => {
                return (
                    <React.Fragment key={repo.id}>
                        <RepoTile item={repo} />
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
