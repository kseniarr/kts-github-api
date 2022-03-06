export type RepoItemApi = {
    id: string;
    name: string;
    owner: { login: string; avatar_url: string; html_url: string };
    stargazers_count: number;
    created_at: Date;
    html_url: string;
};

export type RepoItemModel = {
    id: string;
    repoName: string;
    orgName: string;
    numStars: number;
    lastUpdated: string;
    repoUrl: string;
    organizationUrl: string;
    avatarUrl: string;
};

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

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
    id: from.id,
    repoName: from.name,
    orgName: from.owner.login,
    numStars: from.stargazers_count,
    lastUpdated: `Updated ${new Date(from.created_at).getDate()} ${
        monthNames[new Date(from.created_at).getMonth()]
    }`,
    repoUrl: from.html_url,
    organizationUrl: from.owner.html_url,
    avatarUrl: from.owner.avatar_url,
});
