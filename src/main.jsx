import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ApiProvider from "./contexts/ApiContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import BackgroundComponent from "./components/BackgroundComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ApiProvider>
            <BackgroundComponent>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}></Route>
                        <Route path="/search" element={<SearchPage />}></Route>
                    </Routes>
                </BrowserRouter>
            </BackgroundComponent>
            
        </ApiProvider>
    </React.StrictMode>
);
