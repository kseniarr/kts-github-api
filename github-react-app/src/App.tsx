import ReposSearchPage from "@pages/ReposSearchPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/repos" element={<ReposSearchPage />}></Route>
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
    );
}

export default App;
