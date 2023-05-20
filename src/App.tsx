import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import PageLayout from "./layout/PageLayout";
import MyUrls from "./pages/my-urls/MyUrls";
import NotFound from "./pages/not-found/NotFound";
import ErrorPage from "./pages/error-page/ErrorPage";

import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<PageLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/urls" element={<MyUrls />} />
            </Route>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
