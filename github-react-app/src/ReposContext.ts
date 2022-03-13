import { createContext, useContext } from "react";

import { RepoItemModel } from "@store/models";

export type ReposContextType = {
    list: RepoItemModel[];
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
