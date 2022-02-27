import React from "react";

type AvatarProps = {
    src?: string;
    alt?: string;
    letter: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
    const hasAvatar = src !== null && src !== "";

    return hasAvatar ? (
        <img className="git-repo-tile__avatar" src={src} alt={alt} />
    ) : (
        <div className="git-repo-tile__avatar">{letter}</div>
    );
};

export default React.memo(Avatar);
