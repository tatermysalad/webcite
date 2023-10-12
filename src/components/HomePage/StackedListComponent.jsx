import { useState, useEffect } from "react";
import ReferencesComponent from "./ReferencesComponent";
import ReferenceExampleComponent from "../SearchPage/ReferenceExampleComponent";

export default function StackedList() {
    // const [localStorage, setLocalStorage] = useLocalStorage("References", null);
    const [references, setReferences] = useState([]);
    const [copiedItems, setCopiedItems] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState("Chicago");

    const getReferencesFromLocalStorage = () => {
        const storedValue = localStorage.getItem("References");
        const references = storedValue ? JSON.parse(storedValue) : null;
        setReferences(references);
    };

    useEffect(() => {
        // Initial retrieval of references
        getReferencesFromLocalStorage();

        // Set up a timer to periodically check for changes in local storage
        const refreshInterval = setInterval(() => {
            getReferencesFromLocalStorage();
        }, 500); // Adjust the interval as needed (e.g., every 10 seconds)

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    const handleCopyAllClick = () => {
        const allItemsText = JSON.stringify(references, null, 4);
        navigator.clipboard.writeText(allItemsText);
        setCopiedItems(Array(references.length).fill(true));
    };

    const handleDeleteAllClick = () => {
        localStorage.removeItem("References");
        setReferences([]);
    };

    return (
        <div id="stackedList">
            <div className="text-center mt-4">
                <button
                    onClick={() => setSelectedStyle("Chicago")}
                    className={`m-1 px-4 py-2 text-sm font-medium ${
                        selectedStyle === "Chicago" ? "text-white bg-green-500" : "text-gray-500 bg-gray-200"
                    } rounded-md focus:outline-none hover:bg-green-300 hover:text-black`}
                >
                    Chicago
                </button>
                <button
                    onClick={() => setSelectedStyle("APA")}
                    className={`m-1 px-4 py-2 text-sm font-medium ${
                        selectedStyle === "APA" ? "text-white bg-blue-500" : "text-gray-500 bg-gray-200"
                    } rounded-md focus:outline-none hover:bg-blue-200 hover:text-black`}
                >
                    APA
                </button>
                <button
                    onClick={() => setSelectedStyle("MLA")}
                    className={`m-1 px-4 py-2 text-sm font-medium ${
                        selectedStyle === "MLA" ? "text-white bg-yellow-500" : "text-gray-500 bg-gray-200"
                    } rounded-md focus:outline-none hover:bg-yellow-200 hover:text-black`}
                >
                    MLA
                </button>
            </div>
            <div className="flex justify-center text-left">
                <ReferenceExampleComponent selectedStyle={selectedStyle} />
            </div>
            <div className="flex items-center justify-center">
                {references && (
                    <ul role="list" className="divide-y divide-gray-100">
                        <ReferencesComponent references={references} selectedStyle={selectedStyle} />
                    </ul>
                )}
            </div>
            <div className="flex items-center justify-center">
                <span className="text-center mt-4">
                    <button
                        onClick={handleDeleteAllClick}
                        className="m-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md focus:outline-none hover-bg-red-600"
                    >
                        Delete All
                    </button>
                </span>
                <span className="text-center mt-4">
                    <button
                        onClick={handleCopyAllClick}
                        className="m-1 px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md focus:outline-none hover:bg-purple-600"
                    >
                        Copy All
                    </button>
                </span>
            </div>
        </div>
    );
}
