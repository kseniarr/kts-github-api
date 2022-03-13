import React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import { RepoItemModel } from "@store/models";
import { Link } from "react-router-dom";

type RepoTileProps = {
    onClick?: (id: string) => void;
    item: RepoItemModel;
};

const RepoTile: React.FC<RepoTileProps> = ({ item }) => {
    return (
        <Link to={`/repos/${item.repoName}`}>
            <div className="git-repo-tile">
                <Avatar
                    letter={item.repoName?.charAt(0).toUpperCase()}
                    alt="avatar of ktsstudio's repository"
                    src={item.avatarUrl}
                />
                <div className="git-repo-tile__content">
                    <h5 className="git-repo-tile__repo-name">
                        {item.repoName}
                    </h5>
                    <p className="git-repo-tile__org-link">{item.orgName}</p>
                    <div className="git-repo-tile__info">
                        <div className="git-repo-tile__stars">
                            <StarIcon />
                            <span className="git-repo-tile__num-stars">
                                {item.numStars}
                            </span>
                        </div>
                        <span className="git-repo-tile__date-updated">
                            {item.lastUpdated}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(RepoTile);
