import "./root/root";

import { useState } from "react";

import ReposSearchPage from "@pages/ReposSearchPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ReposContext, ReposContextType } from "./ReposContext";
import { gitStore } from "./root/root";

function App() {
    const [repos] = useState<ReposContextType>({
        list: [],
        isLoading: false,
        load: async (inputValue: string, page: number, perPage: number) => {
            const response = await gitStore.getOrganizationReposList({
                organizationName: inputValue,
                page,
                perPage,
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
