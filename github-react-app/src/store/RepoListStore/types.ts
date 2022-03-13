export type GetOrganizationReposListParams = {
    organizationName: string;
    page: number;
    perPage: number;
    refresh?: boolean;
};

export type PrivateFields =
    | "_list"
    | "_meta"
    | "_inputValue"
    | "_page"
    | "_hasMore";
