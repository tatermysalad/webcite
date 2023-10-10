import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ApiProvider from "./contexts/ApiContext.jsx";
import BackgroundComponent from "./components/BackgroundComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ApiProvider>
            <BackgroundComponent>
                <App />
            </BackgroundComponent>
        </ApiProvider>
    </React.StrictMode>
);
