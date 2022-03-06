export type RepoBranchesApi = {
    name: string;
    organization: string;
};

export type RepoBranchesModel = {
    branchName: string;
    orgName: string;
};

export const normalizeRepoBranches = (
    from: RepoBranchesApi
): RepoBranchesModel => ({
    branchName: from.name,
    orgName: from.organization,
});
