import "./root/root";

import { createContext, useContext, useState } from "react";

import ReposSearchPage from "@pages/ReposSearchPage";
import { RepoItem } from "@store/GitHubStore/types";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { gitStore } from "./root/root";

type ReposContextType = {
    list: RepoItem[];
    isLoading: boolean;
    load: (inputValue: string, page: number, perPage: number) => Promise<any>;
};
const ReposContext = createContext<ReposContextType>({
    list: [],
    isLoading: false,
    load: async (inputValue: string, page: number, perPage: number) => {
        return {};
    },
});

export const useReposContext = () => useContext<ReposContextType>(ReposContext);

function App() {
    const [repos] = useState<ReposContextType>({
        list: [],
        isLoading: false,
        load: async (inputValue: string, page: number, perPage: number) => {
            const response = await gitStore.getOrganizationReposList({
                organizationName: inputValue,
                page: page,
                perPage: perPage,
            });
            return response.success ? response.data : null;
        },
    });
    return (
        <ReposContext.Provider value={repos}>
            <div className="App">
                <BrowserRouter basename="/">
                    <Routes>
                        <Route
                            path="/repos"
                            element={<ReposSearchPage />}
                        ></Route>
                        <Route
                            path="/repos/:repoName"
                            element={<ReposSearchPage />}
                        ></Route>
                        <Route
                            path="*"
                            element={<Navigate replace to="/repos" />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </ReposContext.Provider>
    );
}

export default App;
