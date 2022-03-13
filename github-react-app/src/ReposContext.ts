import { createContext, useContext } from "react";

import { RepoItem } from "@store/GitHubStore/types";

export type ReposContextType = {
    list: RepoItem[];
    isLoading: boolean;
    load: (inputValue: string, page: number, perPage: number) => Promise<any>;
};
export const ReposContext = createContext<ReposContextType>({
    list: [],
    isLoading: false,
    load: async (inputValue: string, page: number, perPage: number) => {
        return {};
    },
});

export const useReposContext = () => useContext<ReposContextType>(ReposContext);
